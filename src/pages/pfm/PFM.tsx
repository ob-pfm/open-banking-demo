import { useEffect, useCallback, useRef, useMemo, useState } from 'react';
import { Outlet } from 'react-router-dom';
import { toast } from 'react-toastify';

import Menu from './components/Menu';
import { buildClients } from '../../libs/sdk';
import '../../libs/wc/ob-onboarding-component';
import '../../libs/wc/ob-consent-wizard-component';

import './style.css';
import Bank from '../../libs/sdk/models/Bank';

const userId = 123;

const PFMPage = () => {
  const onboardingComponentRef = useRef<any>(null);
  const consentWizardComponentRef = useRef<any>(null);
  const { banksClient } = useMemo(() => buildClients('XXXX-XXXX-XXXX', true), []);
  const [selectedBankId, selectBank] = useState<string>('');
  /* const [isDialogOpen, openDialog] = useState<boolean>(false);
  const [resources, setResources] = useState<String[]>([]); */
  const [aggStatus, setAggStatus] = useState<string | null>(null);

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
        banksClient!.getAvailables().then((response: Bank[]) => {
          consentWizardComponentRef.current.banksData = response.map((bank: Bank) => bank.getPlainObject());
        });
      }
    },
    [banksClient]
  );
  /*  const handleCloseDialog = useCallback(() => {
    openDialog(false);
  }, [openDialog]); */
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
      banksClient!.getConsent(selectedBankId, userId, toDate.getTime() - fromDate.getTime()).then((consentResponse) => {
        closeConsentWizard();
        window.open(consentResponse.url, '_blank');
        banksClient!.getResources(selectedBankId, userId).then((resourcesResponse) => {
          toast.info(`Recursos concedidos:\n \n ${resourcesResponse.resources.join(' ')}`, {
            position: 'top-center',
            autoClose: false,
            closeOnClick: true,
            draggable: true,
            progress: undefined,
            theme: 'light'
          });

          /*  console.log('🚀  resourcesResponse', resourcesResponse.resources);
          openDialog(true); */
        });
        banksClient!.getAggregationStatus(selectedBankId, userId).then((aggResponse) => {
          setAggStatus(aggResponse.status);
        });
      });
    },
    [banksClient, selectedBankId, closeConsentWizard]
  );

  useEffect(() => {
    onboardingComponentRef.current.isShown = true;
  }, []);

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
      <Outlet context={{ aggStatus }} />
      <ob-onboarding-component ref={onboardingComponentRef} fontFamily="Lato" lang="pt" />
      <ob-consent-wizard-component ref={consentWizardComponentRef} fontFamily="Lato" lang="pt" />
      {/* {isDialogOpen && (
        <Dialog
          title="Dialog Title"
          modal
          onClose={handleCloseDialog}
          buttons={[
            {
              text: 'Close',
              onClick: () => handleCloseDialog()
            }
          ]}
        >
          <h1>Recursos concedidos</h1>
          <ul>
            {resources.map((resourceText, i) => (
              <li key={`text-${resourceText}`}>{resourceText}</li>
            ))}
          </ul>
        </Dialog>
      )} */}
    </>
  );
};

export default PFMPage;
