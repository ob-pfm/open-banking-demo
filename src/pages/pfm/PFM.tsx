import { useEffect, useCallback, useRef, useMemo, useState } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import Modal from 'react-modal';

import Menu from './components/Menu';
import { buildClients, Error, User } from '../../libs/sdk';
import '../../libs/wc/ob-onboarding-component';
import {
  API_KEY,
  CONSENT_IN_PROCESS,
  URL_SERVER,
  AGG_IN_PROCESS,
  CONSENT_REQUESTED,
  CONSENT_AUTHORISED,
  CONSENT_REJECTED,
  CONSENT_DELETED,
  AGGREGATION_STARTED,
  AGGREGATION_COMPLETED,
  PROCESS_FAILED
} from '../../constants';
import { getUserId, showErrorToast } from '../../helpers';

import './style.css';

const PFMPage = () => {
  const navigate = useNavigate();
  const onboardingComponentRef = useRef<any>(null);
  const { usersClient, banksClient } = useMemo(() => buildClients(API_KEY, URL_SERVER), []);

  const [userId, setUserId] = useState<number | null>(getUserId());
  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  const [alertText, setAlertText] = useState<string>('');
  const [initConsent, setInitconsent] = useState<boolean>(false);
  const [currentBankStatus, setCurrentBankStatus] = useState<string | null>(null);
  const [aggBankId, setAggBankId] = useState<string | null>(localStorage.getItem('agg_bank_id'));
  const [bankStatus, setBankStatus] = useState<string | null>(localStorage.getItem('agg_bank_status'));
  const [resources, setResources] = useState<string[]>([]);
  const [resourcesModalIsShown, showResourcesModal] = useState<boolean>(false);

  const closeOnboarding = useCallback(() => {
    onboardingComponentRef.current.isShown = false;
  }, []);

  const handleSetUser = useCallback(
    (value: number) => {
      setUserId(value);
      localStorage.setItem('user_id', `${value}`);
    },
    [setUserId]
  );

  const handleSetBankStatus = useCallback(
    (value: string) => {
      setBankStatus(value);
      localStorage.setItem('agg_bank_status', `${value}`);
    },
    [setBankStatus]
  );

  const handleCloseModal = useCallback(() => {
    showResourcesModal(false);
  }, [showResourcesModal]);

  const handleSetAggBankId = useCallback(
    (value: string | null) => {
      localStorage.setItem('agg_bank_id', value || '');
      setAggBankId(value);
    },
    [setAggBankId]
  );

  useEffect(() => {
    if (userId && aggBankId && currentBankStatus === null && !banksClient.isRunningPolling) {
      banksClient.aggregationStatusSubscribe({
        bankId: aggBankId,
        userId,
        time: 15000,
        onResponse: (status) => {
          setCurrentBankStatus(status);
        },
        onError: (error) => {
          setIsProcessing(false);
          toast.error(JSON.stringify(error));
        }
      });
    }
  }, [userId, aggBankId, banksClient, setIsProcessing, currentBankStatus]);

  useEffect(() => {
    if (aggBankId && userId && banksClient.isRunningPolling)
      switch (currentBankStatus) {
        case CONSENT_REQUESTED:
          if (bankStatus !== CONSENT_REQUESTED) {
            toast.info('Consentimento solicitado.');
            setAlertText(CONSENT_IN_PROCESS);
            handleSetBankStatus(CONSENT_REQUESTED);
          }
          break;
        case CONSENT_AUTHORISED:
          if (bankStatus !== CONSENT_AUTHORISED) {
            handleSetBankStatus(CONSENT_AUTHORISED);
            banksClient
              .getResources(aggBankId, userId)
              .then((resourcesResponse) => {
                toast.success('Consentimento concedido.');
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
          toast.warn('Consentimento recusado.');
          setAlertText('');
          handleSetAggBankId(null);
          handleSetBankStatus('');
          setIsProcessing(false);
          break;
        case CONSENT_DELETED:
          toast.warn('Consentimento removido.');
          setAlertText('');
          handleSetBankStatus('');
          handleSetAggBankId(null);
          setIsProcessing(false);
          break;
        case AGGREGATION_STARTED:
          if (bankStatus !== AGGREGATION_STARTED) {
            toast.info('Agregação em andamento');
            setIsProcessing(true);
            handleSetBankStatus(AGGREGATION_STARTED);
          }
          break;
        case AGGREGATION_COMPLETED:
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
      if (e.detail) {
        onboardingComponentRef.current.showModalLoading = true;
        usersClient
          .create(e.detail)
          .then((response: User) => {
            handleSetUser(response.userId);
            toast.success('Usuário criado.');
            setInitconsent(true);
            onboardingComponentRef.current.isShown = false;
          })
          .catch((error: Error | Error[]) => {
            onboardingComponentRef.current.showModalLoading = false;
            showErrorToast(error);
          });
      }
    },
    [usersClient, handleSetUser]
  );

  useEffect(() => {
    if (!userId) {
      onboardingComponentRef.current.isShown = true;
    }
  }, [userId]);

  useEffect(() => {
    const onboardingComponentRefCurrent = onboardingComponentRef.current;

    onboardingComponentRefCurrent.addEventListener('close-modal', closeOnboarding);
    onboardingComponentRefCurrent.addEventListener('continue', continueFromOnboarding);
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
          showResourcesModal
        }}
      />
      <ob-onboarding-component ref={onboardingComponentRef} fontFamily="Lato" lang="pt" />
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
