import { useEffect, useCallback, useRef, useMemo, useState } from 'react';
import { Outlet } from 'react-router-dom';

import Menu from './components/Menu';
import { buildClients } from '../../libs/sdk';
import '../../libs/wc/ob-onboarding-component';
import '../../libs/wc/ob-consent-wizard-component';

import './style.css';

const userId = 123;

const PFMPage = () => {
  const onboardingComponentRef = useRef<any>(null);
  const consentWizardComponentRef = useRef<any>(null);
  const { banksClient } = useMemo(() => buildClients('XXXX-XXXX-XXXX', true), []);
  const [selectedBankId, selectBank] = useState<string>('');

  const closeOnboarding = useCallback(() => {
    onboardingComponentRef.current.isShown = false;
  }, []);
  const closeConsentWizard = useCallback(() => {
    consentWizardComponentRef.current.isShown = false;
  }, []);
  const continueFromOnboarding = useCallback(
    (e: { detail: string }) => {
      if (e.detail) {
        onboardingComponentRef.current.isShown = false;
        consentWizardComponentRef.current.isShown = true;
        banksClient!.getAvailables().then((response) => {
          consentWizardComponentRef.current.banksData = response.map((bank) => bank.getPlainObject());
        });
      }
    },
    [banksClient]
  );
  const handleSelectBank = useCallback(
    (e: { detail: string }) => {
      selectBank(e.detail);
    },
    [selectBank]
  );
  const handleSubmitConsent = useCallback(
    (e: { detail: string }) => {
      const fromDate = new Date();
      const toDate = new Date();
      const months = parseInt(e.detail);
      toDate.setMonth(fromDate.getMonth() + months);
      banksClient!.getConsent(selectedBankId, userId, toDate.getTime() - fromDate.getTime()).then((response) => {
        closeConsentWizard();
        window.open(response.url, '_blank');
      });
    },
    [banksClient, selectedBankId, closeConsentWizard]
  );

  useEffect(() => {
    const consentWizardComponentRefCurrent = consentWizardComponentRef.current;
    const onboardingComponentRefCurrent = onboardingComponentRef.current;
    onboardingComponentRefCurrent.isShown = true;
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
      <Outlet />
      <ob-onboarding-component ref={onboardingComponentRef} fontFamily="Lato" lang="pt" />
      <ob-consent-wizard-component ref={consentWizardComponentRef} fontFamily="Lato" lang="pt" />
    </>
  );
};

export default PFMPage;
