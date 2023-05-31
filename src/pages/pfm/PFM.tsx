import { useEffect, useCallback, useRef, useMemo, useState } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import Modal from 'react-modal';
import { buildClients } from 'open-banking-pfm-sdk';

import Menu from './components/Menu';
import {
  CONSENT_IN_PROCESS,
  AGG_IN_PROCESS,
  CONSENT_REQUESTED,
  CONSENT_AUTHORISED,
  CONSENT_REJECTED,
  CONSENT_DELETED,
  AGGREGATION_STARTED,
  AGGREGATION_COMPLETED,
  PROCESS_FAILED,
  URL_SERVER as serverUrl
} from '../../constants';
import { getApiKey, getUserId, showErrorToast } from '../../helpers';

import '../../libs/wc/ob-onboarding-component';
import './style.css';

const PFMPage = () => {
  const navigate = useNavigate();

  const onboardingComponentRef = useRef<any>(null); // Ref object to hold a reference to ob-onboarding-component
  const apiKey = getApiKey(); // Fetching API key from helper function

  const { banksClient } = useMemo(() => buildClients({ apiKey: apiKey || '', serverUrl }), [apiKey]); // Memoized function for building clients with API key and URL_SERVER as dependencies
  // State variable to hold user ID, initialized with value from helper function
  const [userId, setUserId] = useState<number | null>(getUserId());
  // State variable to indicate if processing is in progress
  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  // State variable to hold alert text
  const [alertText, setAlertText] = useState<string>('');
  // State variable to indicate if consent is initialized
  const [initConsent, setInitconsent] = useState<boolean>(false);
  // State variable to hold current bank status
  const [currentBankStatus, setCurrentBankStatus] = useState<string | null>(null);
  const [aggBankId, setAggBankId] = useState<string | null>(localStorage.getItem('agg_bank_id')); // State variable to hold aggregated bank ID, initialized with value from localStorage
  const [bankStatus, setBankStatus] = useState<string | null>(localStorage.getItem('agg_bank_status')); // State variable to hold bank status, initialized with value from localStorage
  const [resources, setResources] = useState<string[]>([]); // State variable to hold resources
  // State variable to indicate if resources modal is shown
  const [resourcesModalIsShown, showResourcesModal] = useState<boolean>(false);

  const closeOnboarding = useCallback(() => {
    onboardingComponentRef.current.isShown = false; // Callback function to close the onboarding modal
  }, []);

  const handleSetUser = useCallback(
    (value: number) => {
      setUserId(value); // Callback function to set user ID
      localStorage.setItem('user_id', `${value}`); // Store user ID in localStorage
    },
    [setUserId]
  );

  const handleSetBankStatus = useCallback(
    (value: string) => {
      setBankStatus(value); // Set the state value for bankStatus using setBankStatus
      localStorage.setItem('agg_bank_status', `${value}`); // Store the value of bankStatus in localStorage
    },
    [setBankStatus] // Dependence on setBankStatus, so that the callback is only recreated if setBankStatus changes
  );

  const handleCloseModal = useCallback(
    () => {
      showResourcesModal(false); // Call the showResourcesModal function with false argument to hide the resources modal
    },
    // Dependence on showResourcesModal, so that the callback is only recreated if showResourcesModal changes
    [showResourcesModal]
  );

  const handleSetAggBankId = useCallback(
    (value: string | null) => {
      localStorage.setItem('agg_bank_id', value || ''); // Store the value of agg_bank_id in localStorage
      setAggBankId(value); // Set the state value for aggBankId using setAggBankId
    },
    [setAggBankId] // Dependence on setAggBankId, so that the callback is only recreated if setAggBankId changes
  );

  useEffect(() => {
    if (userId && aggBankId && currentBankStatus === null && !banksClient.isRunningPolling) {
      banksClient.aggregationStatusSubscribe({
        bankId: aggBankId,
        userId,
        time: 5000,
        onResponse: (status) => {
          setCurrentBankStatus(status); // Update the currentBankStatus state with the received status
        },
        onError: (error) => {
          setIsProcessing(false); // Set isProcessing state to false
          toast.error(JSON.stringify(error)); // Show error toast with the error message
        }
      });
    }
  }, [userId, aggBankId, banksClient, setIsProcessing, currentBankStatus]);

  useEffect(() => {
    // Run this effect when aggBankId, userId, and banksClient.isRunningPolling are truthy
    if (aggBankId && userId && banksClient.isRunningPolling)
      switch (currentBankStatus) {
        case CONSENT_REQUESTED:
          // If currentBankStatus is CONSENT_REQUESTED and bankStatus is not CONSENT_REQUESTED
          // Show info toast, set alert text, and update bank status to CONSENT_REQUESTED
          if (bankStatus !== CONSENT_REQUESTED) {
            toast.info('Consetimento solicitado.');
            setAlertText(CONSENT_IN_PROCESS);
            handleSetBankStatus(CONSENT_REQUESTED);
          }
          break;
        case CONSENT_AUTHORISED:
          // If currentBankStatus is CONSENT_AUTHORISED and bankStatus is not CONSENT_AUTHORISED
          // Update bank status to CONSENT_AUTHORISED, get resources from banksClient, show success toast,
          // set alert text, show resources modal, set processing state, and synchronize aggregation
          if (bankStatus !== CONSENT_AUTHORISED) {
            handleSetBankStatus(CONSENT_AUTHORISED);
            banksClient
              .getResources(aggBankId, userId)
              .then((resourcesResponse) => {
                toast.success('Consetimento concedido.');
                setAlertText(AGG_IN_PROCESS);
                setResources(resourcesResponse.resources);
                showResourcesModal(true);
                setIsProcessing(true);
                banksClient
                  .synchronize(aggBankId, userId)
                  .then(() => toast.info('Agregação iniciada'))
                  .catch(() => {
                    setIsProcessing(false);
                    handleSetAggBankId(null);
                    banksClient.aggregationStatusUnsubscribe();
                    setAlertText('');
                    toast.error('Falha ao iniciar a agregação');
                  });
              })
              .catch((error) => {
                handleSetBankStatus('');
                showErrorToast(error);
                setIsProcessing(false);
              });
          }
          break;
        case CONSENT_REJECTED:
          // If currentBankStatus is CONSENT_REJECTED
          // Show warning toast, set alert text, reset aggBankId, bank status, and processing state
          toast.warn('Consetimento recusado.');
          setAlertText('');
          handleSetAggBankId(null);
          handleSetBankStatus('');
          setIsProcessing(false);
          break;
        case CONSENT_DELETED:
          // If currentBankStatus is CONSENT_DELETED
          // Show warning toast, set alert text, reset bank status, aggBankId, and processing state
          toast.warn('Consetimento removido.');
          setAlertText('');
          handleSetBankStatus('');
          handleSetAggBankId(null);
          setIsProcessing(false);
          break;
        case AGGREGATION_STARTED:
          // If currentBankStatus is AGGREGATION_STARTED and bankStatus is not AGGREGATION_STARTED
          // Show info toast, set processing state, and update bank status to AGGREGATION_STARTED
          if (bankStatus !== AGGREGATION_STARTED) {
            toast.info('Agregação em andamento');
            setIsProcessing(true);
            handleSetBankStatus(AGGREGATION_STARTED);
          }
          break;
        case AGGREGATION_COMPLETED:
          // If currentBankStatus is AGGREGATION_COMPLETED
          // Reset processing state, bank status, aggBankId, and alert text
          // Unsubscribe from aggregation status, show success toast
          // If current pathname contains 'cuentas' or 'movimientos', reload the window after 3 seconds
          setIsProcessing(false);
          handleSetAggBankId(null);
          handleSetBankStatus('');
          banksClient.aggregationStatusUnsubscribe();
          setAlertText('');
          toast.success('Agregação de banco finalizada.');
          if (window.location.pathname.indexOf('cuentas') || window.location.pathname.indexOf('movimientos'))
            setTimeout(() => window.location.reload(), 3000);
          break;
        case PROCESS_FAILED:
          // If currentBankStatus is PROCESS_FAILED
          // Reset processing state, bank status, aggBankId, and alert text
          // Unsubscribe from aggregation status, show success toast
          // Show error toast
          setIsProcessing(false);
          handleSetAggBankId(null);
          handleSetBankStatus('');
          banksClient.aggregationStatusUnsubscribe();
          setAlertText('');
          toast.error('Falha na agregação.');
          break;
        default:
          break;
      }
  }, [
    currentBankStatus,
    banksClient,
    userId,
    handleSetAggBankId,
    navigate,
    setAlertText,
    setIsProcessing,
    aggBankId,
    bankStatus,
    handleSetBankStatus
  ]);

  const continueFromOnboarding = useCallback(
    (e: { detail: string }) => {
      if (e.detail && apiKey) {
        onboardingComponentRef.current.showModalLoading = true; // Show modal loading
        fetch(`${serverUrl}/onboarding/users`, {
          method: 'POST',
          headers: { 'X-api-key': apiKey, 'Content-Type': 'application/json' },
          body: JSON.stringify({ cpf: e.detail })
        })
          .then((res) => res.json())
          .then((response) => {
            handleSetUser(response.userId); // Set user ID in state
            toast.success('Usuário criado.'); // Show success toast
            setInitconsent(true); // Set initConsent state to true
            onboardingComponentRef.current.isShown = false; // Hide onboarding modal
          })
          .catch((_error) => {
            onboardingComponentRef.current.showModalLoading = false; // Hide modal loading
            showErrorToast(_error); // Show error toast
          });
      }
    },
    [handleSetUser, apiKey]
  );

  // Show onboarding modal if userId is not present
  useEffect(() => {
    if (!userId) {
      onboardingComponentRef.current.isShown = true;
    }
  }, [userId]);

  // Add event listeners for close-modal and continue events on onboardingComponentRef
  useEffect(() => {
    const onboardingComponentRefCurrent = onboardingComponentRef.current;

    // Add event listener for close-modal event
    onboardingComponentRefCurrent.addEventListener('close-modal', closeOnboarding);

    // Add event listener for continue event
    onboardingComponentRefCurrent.addEventListener('continue', continueFromOnboarding);

    // Remove event listeners when component is unmounted
    return () => {
      onboardingComponentRefCurrent.removeEventListener('close-modal', closeOnboarding);
      onboardingComponentRefCurrent.removeEventListener('continue', continueFromOnboarding);
    };
  }, [closeOnboarding, continueFromOnboarding]);

  return (
    <>
      <Menu userId={userId} />
      <Outlet
        context={{
          isProcessing,
          alertText,
          userId,
          setIsProcessing,
          setAlertText,
          initConsent,
          setAggBankId,
          resources,
          resourcesModalIsShown,
          handleSetAggBankId,
          showResourcesModal,
          apiKey
        }}
      />
      <ob-onboarding-component
        ref={onboardingComponentRef} // Pass a ref to `onboardingComponentRef`
        fontFamily="Lato" // Set the `fontFamily` prop to "Lato"
      />
      {/* Render a `Modal` component */}
      <Modal
        isOpen={resourcesModalIsShown} // Set the `isOpen` prop to the value of `resourcesModalIsShown` variable
        onRequestClose={handleCloseModal} // Set the `onRequestClose` prop to the `handleCloseModal` function
        contentLabel="Example Modal" // Set the `contentLabel` prop to "Example Modal"
      >
        {/* Render a `div` element with a close button */}
        <div className="close-button" onClick={handleCloseModal} role="presentation">
          {/* Render a close button icon */}
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M1 13L13 1M1 1L13 13"
              stroke="#989DB3"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
        <h2>Consetimento</h2>
        <ul>
          {resources.map((resourceText) => (
            <li key={`resource-list-item-${resourceText}`}>{resourceText}</li>
          ))}
        </ul>
      </Modal>
    </>
  );
};

export default PFMPage;
