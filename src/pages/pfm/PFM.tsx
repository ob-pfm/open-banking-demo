import { useEffect, useCallback, useRef, useMemo, useState } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

import Menu from './components/Menu';
import { buildClients, Error, User } from '../../libs/sdk';
import '../../libs/wc/ob-onboarding-component';
import { API_KEY, URL_SERVER } from '../../constants';
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
  const [selectedBank, selectBank] = useState<string | null>(null);
  const [currentBankStatus, setCurrentBankStatus] = useState<string | null>(null);
  const [aggBankId, setAggBankId] = useState<string | null>(localStorage.getItem('agg_bank_id'));
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

  const handleSetAggBankId = useCallback(
    (value: string | null) => {
      localStorage.setItem('agg_bank_id', value || '');
      setAggBankId(value);
    },
    [setAggBankId]
  );

  useEffect(() => {
    if (userId && aggBankId && !banksClient.isRunningPolling) {
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
  }, [userId, aggBankId, banksClient, setIsProcessing]);

  useEffect(() => {
    if (selectedBank && userId)
      switch (currentBankStatus) {
        case 'CONSENT_REQUESTED':
          toast.info('Consentimento solicitado.');
          /** setAlertText(CONSENT_IN_PROCESS);
          showAlert(true); */
          break;
        case 'CONSENT_AUTHORISED':
          banksClient
            .getResources(selectedBank, userId)
            .then((resourcesResponse) => {
              toast.success('Consentimento concedido.');
              setResources(resourcesResponse.resources);
              showResourcesModal(true);
              setIsProcessing(true);
              banksClient.synchronize(selectedBank, userId);
            })
            .catch((error) => {
              showErrorToast(error);
              setIsProcessing(false);
            });
          break;
        case 'CONSENT_REJECTED':
          toast.warn('Consentimento recusado.');
          handleSetAggBankId(null);
          setIsProcessing(false);
          break;
        case 'CONSENT_DELETED':
          toast.warn('Consentimento removido.');
          handleSetAggBankId(null);
          setIsProcessing(false);
          break;
        case 'AGGREGATION_STARTED':
          toast.success('Agregação iniciada');
          setIsProcessing(true);
          break;
        case 'AGGREGATION_COMPLETED':
          setIsProcessing(false);
          handleSetAggBankId(null);
          banksClient.aggregationStatusUnsubscribe();
          toast.success('Agregação de banco finalizada.');
          setTimeout(() => window.location.reload(), 1500);
          break;
        case 'PROCESS_FAILED':
          setIsProcessing(false);
          handleSetAggBankId(null);
          /** banksClient.aggregationStatusUnsubscribe(); */
          toast.error('Falha na solicitação de consentimento.');
          break;
        default:
          break;
      }
  }, [
    currentBankStatus,
    banksClient,
    selectedBank,
    userId,
    handleSetAggBankId,
    navigate,
    setAlertText,
    setIsProcessing
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
          selectBank,
          resourcesModalIsShown,
          selectedBank,
          handleSetAggBankId,
          showResourcesModal
        }}
      />
      <ob-onboarding-component ref={onboardingComponentRef} fontFamily="Lato" lang="pt" />
    </>
  );
};

export default PFMPage;
