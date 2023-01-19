import { useEffect, useCallback, useRef, useMemo, useState } from 'react';
import { Outlet } from 'react-router-dom';
import { toast } from 'react-toastify';
import Modal from 'react-modal';

import { buildClients, Bank, Error, User } from 'open-banking-pfm-sdk';

import Menu from './components/Menu';
import { API_KEY, AGG_IN_PROCESS, CONSENT_IN_PROCESS } from '../../constants';
import { getUserId, showErrorToast } from '../../helpers';

import './style.css';

const PFMPage = () => {
  const onboardingComponentRef = useRef<any>(null);
  const consentWizardComponentRef = useRef<any>(null);
  const { banksClient, usersClient } = useMemo(() => buildClients(API_KEY), []);
  const [selectedBankId, selectBank] = useState<string | null>(null);
  const [aggBankId, setAggBankId] = useState<string | null>(localStorage.getItem('agg_bank_id'));
  const [userId, setUserId] = useState<number | null>(getUserId());
  const [alertIsShown, showAlert] = useState<boolean>(false);
  const [alertText, setAlertText] = useState<string>('');
  const [resourcesModalIsShown, showResourcesModal] = useState<boolean>(false);
  const [resources, setResources] = useState<string[]>([]);
  const [currentBankStatus, setCurrentBankStatus] = useState<string | null>(null);

  const closeOnboarding = useCallback(() => {
    onboardingComponentRef.current.isShown = false;
  }, []);
  const closeConsentWizard = useCallback(() => {
    consentWizardComponentRef.current.isShown = false;
  }, []);

  const handleSetUser = useCallback(
    (value: number) => {
      setUserId(value);
      localStorage.setItem('user_id', `${value}`);
    },
    [setUserId]
  );
  const continueFromOnboarding = useCallback(
    (e: { detail: string }) => {
      if (e.detail) {
        onboardingComponentRef.current.showModalLoading = true;
        usersClient
          .create(e.detail)
          .then((response: User) => {
            handleSetUser(response.userId);
            toast.success('Usuário criado.');
            onboardingComponentRef.current.isShown = false;
            consentWizardComponentRef.current.isShown = true;
            banksClient!
              .getAvailables()
              .then((bankResponse: Bank[]) => {
                consentWizardComponentRef.current.banksData = bankResponse.map((bank: Bank) => bank.toObject());
                onboardingComponentRef.current.showModalLoading = false;
              })
              .catch((error) => {
                onboardingComponentRef.current.showModalLoading = false;
                showErrorToast(error);
              });
          })
          .catch((error: Error | Error[]) => {
            onboardingComponentRef.current.showModalLoading = false;
            showErrorToast(error);
          });
      }
    },
    [banksClient, usersClient, handleSetUser]
  );

  const handleSelectBank = useCallback(
    (e: { detail: string }) => {
      selectBank(e.detail);
    },
    [selectBank]
  );

  const handleSetAggBankId = useCallback(
    (value: string | null) => {
      localStorage.setItem('agg_bank_id', value || '');
      setAggBankId(value);
    },
    [setAggBankId]
  );

  const handleCloseModal = useCallback(() => {
    showResourcesModal(false);
  }, [showResourcesModal]);

  const handleSubmitConsent = useCallback(
    (e: { detail: string }) => {
      const fromDate = new Date();
      const toDate = new Date();
      const months = parseInt(e.detail);
      toDate.setMonth(fromDate.getMonth() + months);
      consentWizardComponentRef.current.showModalLoading = true;
      banksClient!
        .createConsent(selectedBankId!, userId!, toDate.getTime() - fromDate.getTime())
        .then((consentResponse) => {
          toast.success('Consentimento criado.');
          consentWizardComponentRef.current.showModalLoading = false;
          closeConsentWizard();
          window.open(consentResponse.url, 'Consentimento', 'width=800, height=500');
          handleSetAggBankId(selectedBankId);
        })
        .catch((error) => {
          showErrorToast(error);
          showAlert(false);
          consentWizardComponentRef.current.showModalLoading = false;
        });
    },
    [banksClient, selectedBankId, closeConsentWizard, userId, handleSetAggBankId]
  );

  useEffect(() => {
    if (!userId) {
      onboardingComponentRef.current.isShown = true;
    }
  }, [userId]);

  useEffect(() => {
    if (userId && aggBankId && !banksClient!.isRunningPolling) {
      banksClient!.aggregationStatusSubscribe({
        bankId: aggBankId!,
        userId: userId!,
        time: 30000,
        onResponse: (status) => {
          setCurrentBankStatus(status);
        },
        onError: (error) => {
          showAlert(false);
          toast.error(JSON.stringify(error));
        }
      });
    }
  }, [userId, aggBankId, banksClient]);

  useEffect(() => {
    switch (currentBankStatus) {
      case 'CONSENT_REQUESTED':
        toast.info('Consentimento solicitado.');
        setAlertText(CONSENT_IN_PROCESS);
        showAlert(true);
        break;
      case 'CONSENT_AUTHORISED':
        banksClient!
          .getResources(selectedBankId!, userId!)
          .then((resourcesResponse) => {
            toast.success('Consentimento concedido.');
            setResources(resourcesResponse.resources);
            showResourcesModal(true);
            showAlert(false);
          })
          .catch((error) => {
            showErrorToast(error);
            showAlert(false);
          });
        break;
      case 'CONSENT_REJECTED':
        toast.warn('Consentimento recusado.');
        handleSetAggBankId(null);
        showAlert(false);
        break;
      case 'CONSENT_DELETED':
        toast.warn('Consentimento removido.');
        handleSetAggBankId(null);
        showAlert(false);
        break;
      case 'AGGREGATION_STARTED':
        setAlertText(AGG_IN_PROCESS);
        showAlert(true);
        break;
      case 'AGGREGATION_COMPLETED':
        showAlert(false);
        handleSetAggBankId(null);
        toast.success('Agregação de banco finalizada. Recarregue a página.');
        banksClient.aggregationStatusUnsubscribe();
        break;
      case 'PROCESS_FAILED':
        showAlert(false);
        handleSetAggBankId(null);
        toast.error('Falha na solicitação de consentimento.');
        banksClient.aggregationStatusUnsubscribe();
        break;
      default:
        break;
    }
  }, [currentBankStatus, banksClient, selectedBankId, userId, handleSetAggBankId]);

  useEffect(() => {
    const consentWizardComponentRefCurrent = consentWizardComponentRef.current;
    const onboardingComponentRefCurrent = onboardingComponentRef.current;
    onboardingComponentRefCurrent.addEventListener('close-modal', closeOnboarding);
    onboardingComponentRefCurrent.addEventListener('continue', continueFromOnboarding);
    consentWizardComponentRefCurrent.addEventListener('select-bank', handleSelectBank);
    consentWizardComponentRefCurrent.addEventListener('on-submit', handleSubmitConsent);
    consentWizardComponentRefCurrent.addEventListener('close-modal', closeConsentWizard);
    return () => {
      onboardingComponentRefCurrent.removeEventListener('close-modal', closeOnboarding);
      onboardingComponentRefCurrent.removeEventListener('continue', continueFromOnboarding);
      consentWizardComponentRefCurrent.removeEventListener('select-bank', handleSelectBank);
      consentWizardComponentRefCurrent.removeEventListener('on-submit', handleSubmitConsent);
      consentWizardComponentRefCurrent.removeEventListener('close-modal', closeConsentWizard);
    };
  }, [closeOnboarding, continueFromOnboarding, closeConsentWizard, handleSubmitConsent, handleSelectBank]);
  return (
    <>
      <Menu />
      <Outlet context={{ alertIsShown, alertText, userId }} />
      <ob-onboarding-component ref={onboardingComponentRef} fontFamily="Lato" lang="pt" />
      <ob-consent-wizard-component ref={consentWizardComponentRef} fontFamily="Lato" lang="pt" />
      <Modal isOpen={resourcesModalIsShown} onRequestClose={handleCloseModal} contentLabel="Example Modal">
        <div className="close-button" onClick={handleCloseModal} role="presentation">
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
        <h2>Consentimento</h2>
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
