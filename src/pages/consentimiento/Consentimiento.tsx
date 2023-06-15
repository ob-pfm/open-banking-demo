import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { useOutletContext, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { buildClients } from 'open-banking-pfm-sdk';
import { ConsentDetail } from 'open-banking-pfm-sdk/models';
import { showErrorToast } from '../../helpers';
import { URL_SERVER as serverUrl, URL_ASSETS as assetsUrl } from '../../constants';

import { IOutletContext } from '../../interfaces';
import { IConsentRenewEvent } from './interfaces';

import '../../libs/wc/ob-consent-wizard-component';

const ConsentComponent = () => {
  const navigate = useNavigate(); // Get navigate function from react-router-dom
  // Get context data using useOutletContext hook
  const { setIsProcessing, userId, initConsent, handleSetAggBankId, apiKey } = useOutletContext<IOutletContext>();
  // Create memoized instances of banksClient and consentsClient using useMemo hook
  const { banksClient, consentsClient } = useMemo(
    () => buildClients({ apiKey, serverUrl, assetsUrl: `${assetsUrl}/br/financial-entities/` }),
    [apiKey]
  );
  // Create a reference to the consentWizardComponent
  const consentWizardComponentRef = useRef<any>(null);
  // Define state variables
  const [selectedBank, selectBank] = useState<string | null>(null); // Stores the selected bank
  const [filterType, setFilterType] = useState<string | null>(null); // Stores the filter type
  const [filterStatus, setFilterStatus] = useState<string | null>(null); // Stores the filter status

  // Define a callback function to load consents
  const loadConsents = useCallback(() => {
    if (userId) {
      consentWizardComponentRef.current.showMainLoading = true; // Show the main loading indicator

      // Retrieve a list of consents and available banks
      const promises = [consentsClient.getList(userId), banksClient.getAvailables(userId)];
      Promise.all(promises)
        .then((response) => {
          const [consents, banks] = response;
          // Set the banks data in the consentWizardComponentRef
          consentWizardComponentRef.current.banksData = banks;
          // Set the consents data in the consentWizardComponentRef
          consentWizardComponentRef.current.consentsData = consents;
          // Hide the main loading indicator
          consentWizardComponentRef.current.showMainLoading = false;
        })
        .catch((error) => {
          consentWizardComponentRef.current.banksData = []; // Reset the banks data in case of error
          consentWizardComponentRef.current.consentsData = []; // Reset the consents data in case of error
          consentWizardComponentRef.current.showMainLoading = false; // Hide the main loading indicator
          showErrorToast(error); // Show an error toast message
        });
    }
  }, [consentsClient, banksClient, userId]);

  // Define a callback function to handle the selection of a bank
  const handleSelectBank = useCallback(
    (e: { detail: string }) => {
      selectBank(e.detail); // Update the selectedBank state variable with the selected bank
    },
    [selectBank]
  );

  // Define a callback function to handle consent renewal
  const handleRenewConsent = useCallback(
    (e: { detail: IConsentRenewEvent }) => {
      // Update the selectedBank state variable with the bankId from the event detail
      selectBank(e.detail.financialEntity.bankId);
    },
    [selectBank]
  );

  // Define a callback function to handle consent submission
  const handleSubmitConsent = useCallback(
    (e: { detail: string }) => {
      const months = parseInt(e.detail); // Parse the detail value as an integer (number of months)
      consentWizardComponentRef.current.showModalLoading = true; // Show the modal loading indicator

      // Create a consent using the banksClient with the selectedBank, userId, and months as parameters
      banksClient
        .createConsent(selectedBank!, userId!, Number(months))
        .then((consentResponse) => {
          toast.success('Consetimento criado.'); // Show a success toast message
          consentWizardComponentRef.current.showModalLoading = false; // Hide the modal loading indicator
          window.open(consentResponse.url, 'Consetimento', 'width=800, height=600'); // Open a new window with the consent response URL
          handleSetAggBankId(selectedBank); // Update the aggregated bank ID using the handleSetAggBankId function
          setTimeout(() => navigate('/pfm/cuentas'), 1000); // Navigate to '/pfm/cuentas' after a delay of 1000 milliseconds
        })
        .catch((error) => {
          showErrorToast(error); // Show an error toast message
          setIsProcessing(false); // Set the isProcessing state variable to false
          consentWizardComponentRef.current.showModalLoading = false; // Hide the modal loading indicator
        });
    },
    [banksClient, selectedBank, userId, handleSetAggBankId, setIsProcessing, navigate]
  );

  // Define a callback function to handle the selection of a consent
  const handleSelectConsent = useCallback(
    (e: { detail: ConsentDetail }) => {
      consentWizardComponentRef.current.showModalLoading = true; // Show the modal loading indicator
      consentWizardComponentRef.current.consentSelectedData = ''; // Clear the consentSelectedData property

      // Retrieve the consent using the consentsClient with the consentId from the event detail
      consentsClient
        .get(e.detail.consentId)
        .then((consent) => {
          // Set the consentSelectedData property to the retrieved consent
          consentWizardComponentRef.current.consentSelectedData = consent;
          consentWizardComponentRef.current.showModalLoading = false; // Hide the modal loading indicator
        })
        .catch((error) => {
          showErrorToast(error); // Show an error toast message
          consentWizardComponentRef.current.showModalLoading = false; // Hide the modal loading indicator
        });
    },
    [consentsClient]
  );

  // Define a callback function to handle the cancellation of a consent
  const handleCancelConsent = useCallback(
    (e: { detail: ConsentDetail }) => {
      consentWizardComponentRef.current.showModalLoading = true; // Show the modal loading indicator

      // Delete the consent using the consentsClient with the consentId from the event detail
      consentsClient
        .delete(e.detail.consentId)
        .then((_response) => {
          // Hide the modal loading indicator
          consentWizardComponentRef.current.showModalLoading = false;
          loadConsents(); // Reload the consents data
        })
        .catch((error) => {
          showErrorToast(error); // Show an error toast message
          consentWizardComponentRef.current.showModalLoading = false; // Hide the modal loading indicator
        });
    },
    [consentsClient, loadConsents]
  );

  // Define a callback function to handle filtering
  const handleFilter = useCallback((e: { detail: { name: string; label: string; value: string } }) => {
    if (e.detail.name === 'consenttype') {
      setFilterType(e.detail.value); // Update the filterType state variable with the selected value
    } else if (e.detail.name === 'consentstatus') {
      setFilterStatus(e.detail.value); // Update the filterStatus state variable with the selected value
    }
  }, []);

  // Fetch consents data based on the filterType and filterStatus whenever they change
  useEffect(() => {
    if (userId) {
      consentWizardComponentRef.current.showMainLoading = true; // Show the main loading indicator
      const filter: { type?: string; status?: string } = {};

      if (filterType !== null) filter.type = filterType; // Set the filter type if it is not null
      if (filterStatus !== null) filter.status = filterStatus; // Set the filter status if it is not null

      // Retrieve the list of consents using the consentsClient with the userId and filter
      consentsClient
        .getList(userId, filter)
        .then((consents) => {
          // Set the consentsData property to the retrieved consents
          consentWizardComponentRef.current.consentsData = consents;
          consentWizardComponentRef.current.showMainLoading = false; // Hide the main loading indicator
        })
        .catch((error) => {
          consentWizardComponentRef.current.consentsData = []; // Clear the consentsData property
          consentWizardComponentRef.current.showMainLoading = false; // Hide the main loading indicator
          showErrorToast(error); // Show an error toast message
        });
    }
  }, [filterType, filterStatus, consentsClient, userId]);

  // Attach event listeners and clean them up when the component is unmounted
  useEffect(() => {
    const consentWizardComponentRefCurrent = consentWizardComponentRef.current;

    // Add event listeners to the consentWizardComponentRefCurrent
    consentWizardComponentRefCurrent.addEventListener('select-bank', handleSelectBank);
    consentWizardComponentRefCurrent.addEventListener('on-submit', handleSubmitConsent);
    consentWizardComponentRefCurrent.addEventListener('select-consent', handleSelectConsent);
    consentWizardComponentRefCurrent.addEventListener('renew-consent', handleRenewConsent);
    consentWizardComponentRefCurrent.addEventListener('cancel-consent-confirm', handleCancelConsent);
    consentWizardComponentRefCurrent.addEventListener('select-filter', handleFilter);

    // Remove event listeners when the component is unmounted
    return () => {
      consentWizardComponentRefCurrent.removeEventListener('select-bank', handleSelectBank);
      consentWizardComponentRefCurrent.removeEventListener('on-submit', handleSubmitConsent);
      consentWizardComponentRefCurrent.removeEventListener('select-consent', handleSelectConsent);
      consentWizardComponentRefCurrent.removeEventListener('renew-consent', handleRenewConsent);
      consentWizardComponentRefCurrent.removeEventListener('cancel-consent-confirm', handleCancelConsent);
      consentWizardComponentRefCurrent.removeEventListener('select-filter', handleFilter);
    };
  }, [
    handleSubmitConsent,
    handleSelectBank,
    handleSelectConsent,
    handleRenewConsent,
    handleCancelConsent,
    handleFilter
  ]);

  // Load consents when userId or initConsent changes
  useEffect(() => {
    if (userId) loadConsents();
  }, [initConsent, userId, loadConsents]);

  // Render the consent wizard component with specified props and ref
  return <ob-consent-wizard-component ref={consentWizardComponentRef} fontFamily="Lato" />;
};

export default ConsentComponent;
