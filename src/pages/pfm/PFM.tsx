import { useEffect, useCallback, useRef, useMemo } from 'react';
import { Outlet } from 'react-router-dom';

import Menu from './components/Menu';
import { buildClients } from '../../libs/sdk';
import '../../libs/wc/ob-onboarding-component';
import '../../libs/wc/ob-consent-wizard-component';

import './style.css';

const PFMPage = () => {
  const onboardingComponentRef = useRef<any>(null);
  const consentWizardComponentRef = useRef<any>(null);
  const { banksClient } = useMemo(() => buildClients('XXXX-XXXX-XXXX', true), []);
  const closeOnboarding = useCallback(() => {
    onboardingComponentRef.current.isShown = false;
  }, []);
  const closeBankList = useCallback(() => {
    consentWizardComponentRef.current.isShown = false;
  }, []);
  const continueFromOnboarding = useCallback(
    (text: string) => {
      if (text) {
        closeOnboarding();
        consentWizardComponentRef.current.isShown = true;
        banksClient!.getAvailables().then((response) => {
          consentWizardComponentRef.current.banksData = response.map((bank) => bank.getPlainObject());
        });
      }
    },
    [closeOnboarding, banksClient]
  );
  useEffect(() => {
    onboardingComponentRef.current.isShown = true;
    onboardingComponentRef.current.addEventListener('close-modal', () => {
      closeOnboarding();
    });
    onboardingComponentRef.current.addEventListener('continue', (e: { detail: string }) => {
      continueFromOnboarding(e.detail);
    });
    consentWizardComponentRef.current.addEventListener('select-bank', () => {
      closeBankList();
    });
    consentWizardComponentRef.current.addEventListener('close-modal', () => {
      closeBankList();
    });
  }, [closeOnboarding, continueFromOnboarding, closeBankList]);
  return (
    <>
      <Menu />
      <Outlet />
      <ob-onboarding-component ref={onboardingComponentRef} fontFamily="Lato" lang="pt" />
      <ob-consent-wizard-component ref={consentWizardComponentRef} fontFamily="Lato" lang="pt" />
    </>
  );
};

export default PFMPage;
