import { useEffect, useCallback, useRef, useMemo, useState } from 'react';
import { Outlet } from 'react-router-dom';
import { toast } from 'react-toastify';

import Menu from './components/Menu';
import { buildClients, Bank } from '../../libs/sdk';
import '../../libs/wc/ob-onboarding-component';
import '../../libs/wc/ob-consent-wizard-component';
import { API_KEY, AGG_IN_PROCESS, CONSENT_IN_PROCESS } from '../../constants';

import './style.css';
import User from '../../libs/sdk/models/User';

const PFMPage = () => {
  const onboardingComponentRef = useRef<any>(null);
  const consentWizardComponentRef = useRef<any>(null);
  const { banksClient, usersClient } = useMemo(() => buildClients(API_KEY, true), []);
  const [selectedBankId, selectBank] = useState<string>('');
  const [userId, setUserId] = useState<number | null>(null);
  const [alertIsShown, showAlert] = useState<boolean>(false);
  const [alertText, setAlertText] = useState<string>('');
  /* const [isDialogOpen, openDialog] = useState<boolean>(false);
  const [resources, setResources] = useState<String[]>([]); */
  const [currentBankStatus, setCurrentBankStatus] = useState<string | null>(null);

  const closeOnboarding = useCallback(() => {
    onboardingComponentRef.current.isShown = false;
  }, []);
  const closeConsentWizard = useCallback(() => {
    consentWizardComponentRef.current.isShown = false;
  }, []);
  const continueFromOnboarding = useCallback(
    (e: { detail: string }) => {
      if (e.detail) {
        usersClient
          .create(e.detail)
          .then((response: User) => {
            onboardingComponentRef.current.showModalLoading = true;
            setUserId(response.userId);
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
                toast.error(error);
              });
          })
          .catch((error) => {
            onboardingComponentRef.current.showModalLoading = false;
            toast.error(error);
          });
      }
    },
    [banksClient, setUserId, usersClient]
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
      banksClient!
        .createConsent(selectedBankId, userId!, toDate.getTime() - fromDate.getTime())
        .then((consentResponse) => {
          closeConsentWizard();
          window.open(consentResponse.url, '_blank');
          banksClient!.aggregationStatusSubscribe({
            bankId: selectedBankId,
            userId: userId!,
            onResponse: (status) => {
              setCurrentBankStatus(status);
              console.log('onResponse', status);
            },
            onError: (error) => {
              showAlert(false);
              toast.error(`${error}`);
            }
          });
          /* banksClient!.getResources(selectedBankId, userId!).then((resourcesResponse) => {
            toast.info(`Recursos concedidos:\n \n ${resourcesResponse.resources.join(' ')}`, {
              position: 'top-center',
              autoClose: false,
              closeOnClick: true,
              draggable: true,
              progress: undefined,
              theme: 'light'
            });
          });
          banksClient!.getAggregationStatus(selectedBankId, userId!).then((aggResponse) => {
            setAggStatus(aggResponse.status);
          }); */
        });
    },
    [banksClient, selectedBankId, closeConsentWizard, userId]
  );

  useEffect(() => {
    onboardingComponentRef.current.isShown = true;
  }, []);

  useEffect(() => {
    switch (currentBankStatus) {
      case 'CONSENT_REQUESTED_STATUS':
        toast.info('Consentimento solicitado.');
        if (alertText !== CONSENT_IN_PROCESS) {
          setAlertText(CONSENT_IN_PROCESS);
        }
        if (!alertIsShown) {
          showAlert(true);
        }
        break;
      case 'CONSENT_GRANTED_STATUS':
        toast.success('Consentimento concedido.');
        if (alertIsShown) {
          showAlert(false);
        }
        break;
      case 'CONSENT_DELETED_STATUS':
        toast.warn('Consentimento removido.');
        if (alertIsShown) {
          showAlert(false);
        }
        break;
      case 'AGGREGATION_STARTED_STATUS':
        if (alertText !== AGG_IN_PROCESS) {
          setAlertText(AGG_IN_PROCESS);
        }
        if (!alertIsShown) {
          showAlert(true);
        }
        break;
      case 'AGGREGATION_COMPLETED_STATUS':
        if (alertIsShown) {
          showAlert(false);
        }
        toast.success('Agregação de banco finalizada.');
        banksClient.aggregationStatusUnsubscribe();
        break;
      case 'PROCESS_FAILED_STATUS':
        if (alertIsShown) {
          showAlert(false);
        }
        toast.error('Falha na solicitação de consentimento.');
        banksClient.aggregationStatusUnsubscribe();
        break;
      default:
        break;
    }
  }, [currentBankStatus, alertIsShown, alertText, banksClient]);

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
      <Outlet context={{ alertIsShown, alertText }} />
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
