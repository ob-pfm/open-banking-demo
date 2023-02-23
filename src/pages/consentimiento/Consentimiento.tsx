import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { useOutletContext, useNavigate } from 'react-router-dom';
import { Bank, buildClients } from 'open-banking-pfm-sdk';
import { toast } from 'react-toastify';
import { showErrorToast } from '../../helpers';
import { URL_SERVER } from '../../constants';

import '../../libs/wc/ob-consent-wizard-component';
import { IOutletContext } from '../../interfaces';

const ConsentComponent = () => {
  const navigate = useNavigate();
  const { setIsProcessing, userId, initConsent, handleSetAggBankId, apiKey } = useOutletContext<IOutletContext>();
  const { banksClient } = useMemo(() => buildClients(apiKey, URL_SERVER), [apiKey]);
  const consentWizardComponentRef = useRef<any>(null);
  const [selectedBank, selectBank] = useState<string | null>(null);

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

  const closeConsentWizard = useCallback(() => {
    consentWizardComponentRef.current.isShown = false;
  }, []);

  const handleSubmitConsent = useCallback(
    (e: { detail: string }) => {
      const fromDate = new Date();
      const toDate = new Date();
      const months = parseInt(e.detail);
      toDate.setMonth(fromDate.getMonth() + months);
      consentWizardComponentRef.current.showModalLoading = true;
      banksClient
        .createConsent(selectedBank!, userId!, toDate.getTime() - fromDate.getTime())
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

  useEffect(() => {
    const consentWizardComponentRefCurrent = consentWizardComponentRef.current;

    consentWizardComponentRefCurrent.addEventListener('select-bank', handleSelectBank);
    consentWizardComponentRefCurrent.addEventListener('on-submit', handleSubmitConsent);
    consentWizardComponentRefCurrent.addEventListener('close-modal', closeConsentWizard);
    consentWizardComponentRefCurrent.addEventListener('on-click-add', openModalConsent);
    return () => {
      consentWizardComponentRefCurrent.removeEventListener('select-bank', handleSelectBank);
      consentWizardComponentRefCurrent.removeEventListener('on-submit', handleSubmitConsent);
      consentWizardComponentRefCurrent.removeEventListener('close-modal', closeConsentWizard);
      consentWizardComponentRefCurrent.addEventListener('on-click-add', openModalConsent);
    };
  }, [closeConsentWizard, handleSubmitConsent, handleSelectBank, openModalConsent]);

  useEffect(() => {
    if (initConsent) openModalConsent();
  }, [initConsent, openModalConsent]);

  return <ob-consent-wizard-component ref={consentWizardComponentRef} fontFamily="Lato" lang="pt" title="" />;
};

export default ConsentComponent;
