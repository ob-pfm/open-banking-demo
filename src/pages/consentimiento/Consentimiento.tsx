import { useCallback, useEffect, useMemo, useRef } from 'react';
import { useOutletContext, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import Modal from 'react-modal';
import { showErrorToast } from '../../helpers';
import { API_KEY, URL_SERVER } from '../../constants';

import { Bank, buildClients } from '../../libs/sdk';
import '../../libs/wc/ob-consent-wizard-component';
import { IOutletContext } from '../../interfaces';

const ConsentComponent = () => {
  const navigate = useNavigate();
  const {
    setIsProcessing,
    resources,
    userId,
    initConsent,
    selectBank,
    resourcesModalIsShown,
    showResourcesModal,
    selectedBank,
    handleSetAggBankId
  } = useOutletContext<IOutletContext>();
  const { banksClient } = useMemo(() => buildClients(API_KEY, URL_SERVER), []);
  const consentWizardComponentRef = useRef<any>(null);

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
