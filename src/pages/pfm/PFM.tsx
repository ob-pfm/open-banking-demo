import { useEffect, useCallback, useRef, useMemo, useState } from 'react';
import { Outlet } from 'react-router-dom';
import { toast } from 'react-toastify';

import Menu from './components/Menu';
import { buildClients, Error, User } from '../../libs/sdk';
import '../../libs/wc/ob-onboarding-component';
import { API_KEY, URL_SERVER } from '../../constants';
import { getUserId, showErrorToast } from '../../helpers';

import './style.css';

const PFMPage = () => {
  const onboardingComponentRef = useRef<any>(null);
  const { usersClient } = useMemo(() => buildClients(API_KEY, URL_SERVER), []);

  const [userId, setUserId] = useState<number | null>(getUserId());
  const [alertIsShown, showAlert] = useState<boolean>(false);
  const [alertText, setAlertText] = useState<string>('');
  const [initConsent, setInitconsent] = useState<boolean>(false);

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
      <Outlet context={{ alertIsShown, alertText, userId, showAlert, setAlertText, initConsent }} />
      <ob-onboarding-component ref={onboardingComponentRef} fontFamily="Lato" lang="pt" />
    </>
  );
};

export default PFMPage;
