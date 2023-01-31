import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { useNavigate, useOutletContext } from 'react-router-dom';
import { toast } from 'react-toastify';
import Modal from 'react-modal';
import { showErrorToast } from '../../helpers';
import { API_KEY, AGG_IN_PROCESS, CONSENT_IN_PROCESS, URL_SERVER } from '../../constants';

import { Bank, buildClients } from '../../libs/sdk';
import '../../libs/wc/ob-consent-wizard-component';
import { IOutletContext } from '../../interfaces';

const ConsentComponent = () => {
  const navigate = useNavigate();
  const { showAlert, setAlertText, userId, initConsent } = useOutletContext<IOutletContext>();
  const { banksClient } = useMemo(() => buildClients(API_KEY, URL_SERVER), []);
  const consentWizardComponentRef = useRef<any>(null);
  const [aggBankId, setAggBankId] = useState<string | null>(localStorage.getItem('agg_bank_id'));
  const [selectedBank, selectBank] = useState<string | null>(null);
  const [resourcesModalIsShown, showResourcesModal] = useState<boolean>(false);
  const [resources, setResources] = useState<string[]>([]);
  const [currentBankStatus, setCurrentBankStatus] = useState<string | null>(null);

  const openModalConsent = useCallback(() => {
    consentWizardComponentRef.current.isShown = true;
    banksClient!
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
      banksClient!
        .createConsent(selectedBank!, userId!, toDate.getTime() - fromDate.getTime())
        .then((consentResponse) => {
          toast.success('Consentimento criado.');
          consentWizardComponentRef.current.showModalLoading = false;
          closeConsentWizard();
          window.open(consentResponse.url, 'Consentimento', 'width=800, height=500');
          handleSetAggBankId(selectedBank);
        })
        .catch((error) => {
          showErrorToast(error);
          showAlert(false);
          consentWizardComponentRef.current.showModalLoading = false;
        });
    },
    [banksClient, selectedBank, closeConsentWizard, userId, handleSetAggBankId]
  );

  useEffect(() => {
    if (userId && aggBankId && !banksClient!.isRunningPolling) {
      banksClient!.aggregationStatusSubscribe({
        bankId: aggBankId!,
        userId: userId!,
        time: 15000,
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
          .getResources(selectedBank!, userId!)
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
        toast.success('Agregação de banco finalizada.');
        setTimeout(() => navigate('/pfm/cuentas'), 2000);
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
  }, [currentBankStatus, banksClient, selectedBank, userId, handleSetAggBankId]);

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
  }, [closeConsentWizard, handleSubmitConsent, handleSelectBank]);

  useEffect(() => {
    if (initConsent) openModalConsent();
  }, [initConsent]);

  return (
    <>
      <ob-consent-wizard-component ref={consentWizardComponentRef} fontFamily="Lato" lang="pt" title="" />
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

export default ConsentComponent;
