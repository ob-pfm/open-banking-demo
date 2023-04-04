import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { useOutletContext, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { Bank, buildClients } from '../../libs/sdk';
import { ConsentDetail } from '../../libs/sdk/models';
import { showErrorToast } from '../../helpers';
import { URL_SERVER } from '../../constants';

import '../../libs/wc/ob-consent-wizard-component';
import { IOutletContext } from '../../interfaces';
import { IConsentRenewEvent } from './interfaces';

const ConsentComponent = () => {
  const navigate = useNavigate();
  const { setIsProcessing, userId, initConsent, handleSetAggBankId, apiKey } = useOutletContext<IOutletContext>();
  const { banksClient, consentsClient } = useMemo(() => buildClients(apiKey, URL_SERVER), [apiKey]);
  const consentWizardComponentRef = useRef<any>(null);
  const [selectedBank, selectBank] = useState<string | null>(null);

  const loadConsents = useCallback(() => {
    if (userId) {
      consentWizardComponentRef.current.showMainLoading = true;
      const promises = [consentsClient.getList(userId), banksClient.getAvailables()];
      Promise.all(promises)
        .then((response) => {
          const [consents, banks] = response;
          consentWizardComponentRef.current.banksData = banks;
          consentWizardComponentRef.current.consentsData = consents;
          consentWizardComponentRef.current.showMainLoading = false;
        })
        .catch((error) => {
          consentWizardComponentRef.current.banksData = [];
          consentWizardComponentRef.current.consentsData = [];
          consentWizardComponentRef.current.showMainLoading = false;
          showErrorToast(error);
        });
    }
  }, [consentsClient, banksClient, userId]);

  const openModalConsent = useCallback(() => {
    consentWizardComponentRef.current.isShown = true;
    banksClient
      .getAvailables()
      .then((bankResponse: Bank[]) => {
        consentWizardComponentRef.current.banksData = bankResponse.map((bank: Bank) => bank.toObject());
      })
      .catch((error) => {
        showErrorToast(error);
      });
  }, [banksClient]);

  const handleSelectBank = useCallback(
    (e: { detail: string }) => {
      selectBank(e.detail);
    },
    [selectBank]
  );

  const handleRenewConsent = useCallback(
    (e: { detail: IConsentRenewEvent }) => {
      selectBank(e.detail.financialEntity.bankId);
    },
    [selectBank]
  );

  const closeConsentWizard = useCallback(() => {
    consentWizardComponentRef.current.isShown = false;
  }, []);

  const handleSubmitConsent = useCallback(
    (e: { detail: string }) => {
      const months = parseInt(e.detail);
      consentWizardComponentRef.current.showModalLoading = true;
      banksClient
        .createConsent(selectedBank!, userId!, Number(months))
        .then((consentResponse) => {
          toast.success('Consentimento criado.');
          consentWizardComponentRef.current.showModalLoading = false;
          closeConsentWizard();
          window.open(consentResponse.url, 'Consentimento', 'width=800, height=600');
          handleSetAggBankId(selectedBank);
          setTimeout(() => navigate('/pfm/cuentas'), 1000);
        })
        .catch((error) => {
          showErrorToast(error);
          setIsProcessing(false);
          consentWizardComponentRef.current.showModalLoading = false;
        });
    },
    [banksClient, selectedBank, closeConsentWizard, userId, handleSetAggBankId, setIsProcessing, navigate]
  );

  const handleSelectConsent = useCallback(
    (e: { detail: ConsentDetail }) => {
      consentWizardComponentRef.current.showModalLoading = true;
      consentWizardComponentRef.current.consentSelectedData = '';
      consentsClient
        .get(e.detail.consentId)
        .then((consent) => {
          consentWizardComponentRef.current.consentSelectedData = consent;
          consentWizardComponentRef.current.showModalLoading = false;
        })
        .catch((error) => {
          showErrorToast(error);
          consentWizardComponentRef.current.showModalLoading = false;
        });
    },
    [consentsClient]
  );

  const handleCancelConsent = useCallback(
    (e: { detail: ConsentDetail }) => {
      consentWizardComponentRef.current.showModalLoading = true;
      consentsClient
        .delete(e.detail.consentId)
        .then((_response) => {
          consentWizardComponentRef.current.showModalLoading = false;
          loadConsents();
        })
        .catch((error) => {
          showErrorToast(error);
          consentWizardComponentRef.current.showModalLoading = false;
        });
    },
    [consentsClient, loadConsents]
  );

  useEffect(() => {
    const consentWizardComponentRefCurrent = consentWizardComponentRef.current;

    consentWizardComponentRefCurrent.addEventListener('select-bank', handleSelectBank);
    consentWizardComponentRefCurrent.addEventListener('on-submit', handleSubmitConsent);
    consentWizardComponentRefCurrent.addEventListener('close-modal', closeConsentWizard);
    consentWizardComponentRefCurrent.addEventListener('on-click-add', openModalConsent);
    consentWizardComponentRefCurrent.addEventListener('select-consent', handleSelectConsent);
    consentWizardComponentRefCurrent.addEventListener('renew-consent', handleRenewConsent);
    consentWizardComponentRefCurrent.addEventListener('cancel-consent-confirm', handleCancelConsent);

    return () => {
      consentWizardComponentRefCurrent.removeEventListener('select-bank', handleSelectBank);
      consentWizardComponentRefCurrent.removeEventListener('on-submit', handleSubmitConsent);
      consentWizardComponentRefCurrent.removeEventListener('close-modal', closeConsentWizard);
      consentWizardComponentRefCurrent.addEventListener('on-click-add', openModalConsent);
      consentWizardComponentRefCurrent.addEventListener('select-consent', handleSelectConsent);
      consentWizardComponentRefCurrent.addEventListener('renew-consent', handleRenewConsent);
      consentWizardComponentRefCurrent.addEventListener('cancel-consent-confirm', handleCancelConsent);
    };
  }, [
    closeConsentWizard,
    handleSubmitConsent,
    handleSelectBank,
    openModalConsent,
    handleSelectConsent,
    handleRenewConsent,
    handleCancelConsent
  ]);

  useEffect(() => {
    if (initConsent) openModalConsent();
    else if (userId) loadConsents();
  }, [initConsent, openModalConsent, userId, loadConsents]);

  return <ob-consent-wizard-component ref={consentWizardComponentRef} fontFamily="Lato" lang="pt" />;
};

export default ConsentComponent;
