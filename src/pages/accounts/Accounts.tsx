import { useCallback, useEffect, useMemo, useRef } from 'react';
import { useOutletContext, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

import { FinancialEntity } from 'open-banking-pfm-sdk/models';
import { Account, AccountsClient, AccountPayload, UsersClient } from 'open-banking-pfm-sdk';
import { URL_SERVER as serverUrl, URL_ASSETS as assetsUrl } from '../../constants';
import { IOutletContext } from '../../interfaces';
import styles from './style.css';
import { showErrorToast } from '../../helpers';

import '../../libs/wc/ob-accounts-component';

interface ISubmitEventData {
  account: {
    id?: number;
    balance: number;
    chargeable: boolean;
    financialEntityId: string;
    name: string;
    nature: string;
    number: string;
  };
  onSuccess: () => void;
}
interface IDeleteEventData {
  accountId: number;
  onSuccess: () => void;
}
const AccountsComponent = () => {
  const componentRef = useRef<any>(null); // Create a ref for the component
  // Get context data using useOutletContext hook
  const { isProcessing, userId, alertText, apiKey } = useOutletContext<IOutletContext>();
  const navigate = useNavigate(); // Get navigate function from react-router-dom

  // Create instances of AccountsClient and BanksClient using memoized version
  const accountServices = useMemo(() => new AccountsClient({ apiKey, serverUrl }), [apiKey]);
  const userServices = useMemo(
    () => new UsersClient({ apiKey, serverUrl, assetsUrl: `${assetsUrl}/br/financial-entities/` }),
    [apiKey]
  );

  // Load accounts when component mounts or userId changes
  const loadAccounts = useCallback(() => {
    if (userId) {
      // Show loading indicator in the component
      componentRef.current.showMainLoading = true;
      // Fetch accounts and banks data in parallel
      const promises = [accountServices.getList(userId), userServices.getFinancialEntities()];
      Promise.all(promises)
        .then((response) => {
          const accounts: Account[] = response[0] as Account[]; // Extract accounts data from response
          // Extract banks data from response
          const financialEntities: FinancialEntity[] = response[1] as FinancialEntity[];
          componentRef.current.accountsData = accounts; // Set accounts data in the component
          // Set available banks data to add accounts in the component
          componentRef.current.financialEntitiesData = financialEntities;
          componentRef.current.showMainLoading = false; // Hide loading indicator in the component
        })
        .catch((error) => {
          componentRef.current.banksData = []; // Reset banks data in the component
          componentRef.current.banksAccountData = []; // Reset accounts data in the component
          showErrorToast(error); // Show error toast
        });
    }
  }, [componentRef, accountServices, userId, userServices]);

  // Event handler for 'save-new' event
  const handleSaveAccount = useCallback(
    (e: { detail: ISubmitEventData }) => {
      if (userId) {
        componentRef.current.showMainLoading = true; // Show loading indicator in the component
        const { account, onSuccess } = e.detail;
        onSuccess(); // Call onSuccess callback
        const { financialEntityId, ...rest } = account;
        const newAccount = new AccountPayload({
          userId,
          financialEntityId: parseInt(financialEntityId),
          ...rest
        });
        accountServices
          .create(newAccount)
          .then((_response: Account) => {
            loadAccounts(); // Reload accounts data
            toast.success('Conta adicionada.'); // Show success toast
            componentRef.current.showMainLoading = false;
          })
          .catch((_error) => {
            toast.error('Um erro ocorreu.');
            componentRef.current.showMainLoading = false;
          });
      }
    },
    [accountServices, userId, loadAccounts]
  );

  const handleEditAccount = useCallback(
    (e: { detail: ISubmitEventData }) => {
      if (userId) {
        componentRef.current.showMainLoading = true; // Show loading indicator in the component
        const { account, onSuccess } = e.detail;
        onSuccess(); // Call onSuccess callback
        const { id, financialEntityId, ...rest } = account;
        const editedAccount = new AccountPayload({
          userId,
          financialEntityId: parseInt(financialEntityId),
          ...rest
        });
        accountServices
          .edit(id!, editedAccount)
          .then((_response: Account) => {
            loadAccounts(); // Reload accounts data
            toast.success('Alterações salvas.'); // Show success toast
            componentRef.current.showMainLoading = false; // Hide loading indicator in the component
          })
          .catch((_error) => {
            toast.error('Um erro ocorreu.'); // Show error toast
            componentRef.current.showMainLoading = false; // Hide loading indicator in the component
          });
      }
    },
    [accountServices, userId, loadAccounts]
  );

  const handleDeleteAccount = useCallback(
    (e: { detail: IDeleteEventData }) => {
      componentRef.current.showMainLoading = true; // Show loading indicator in the component
      const { accountId, onSuccess } = e.detail;
      onSuccess(); // Call onSuccess callback
      accountServices
        .delete(accountId)
        .then((response: boolean) => {
          if (response) {
            loadAccounts(); // Reload accounts data
            toast.success('Conta apagada.'); // Show success toast
            componentRef.current.showMainLoading = false; // Hide loading indicator in the component
          }
        })
        .catch((_error) => {
          toast.error('Um erro ocorreu.'); // Show error toast
          componentRef.current.showMainLoading = false; // Hide loading indicator in the component
        });
    },
    [accountServices, loadAccounts]
  );

  const handleClickAccount = useCallback(
    (e: { detail: IDeleteEventData }) => {
      navigate(`/pfm/movimientos?account_id=${e.detail}`); // Navigate to a different route with query parameters
    },
    [navigate]
  );

  useEffect(() => {
    loadAccounts(); // Load accounts when component mounts or userId changes
  }, [loadAccounts]);

  useEffect(() => {
    const componentRefCurrent = componentRef.current;
    // Attach event listeners
    componentRefCurrent.addEventListener('save-new', handleSaveAccount);
    componentRefCurrent.addEventListener('save-edit', handleEditAccount);
    componentRefCurrent.addEventListener('delete', handleDeleteAccount);
    componentRefCurrent.addEventListener('click-account-collapsible-section', handleClickAccount);
    // Set component styles
    componentRefCurrent.componentStyles = `
      .obwc-accounts__balance-list-card .obwc-accounts__short-term-balance-item{
        display:none;
      }
      .obwc-accounts__balance-list-card .obwc-accounts__long-term-balance-item{
        display:none;
      }
    `;
    // Cleanup function
    return () => {
      // Remove event listeners
      componentRefCurrent.removeEventListener('save-new', handleSaveAccount);
      componentRefCurrent.removeEventListener('save-edit', handleEditAccount);
      componentRefCurrent.removeEventListener('delete', handleDeleteAccount);
      componentRefCurrent.removeEventListener('click-account-collapsible-section', handleClickAccount);
    };
  }, [handleSaveAccount, handleEditAccount, handleDeleteAccount, handleClickAccount]);
  /**
   * Renders an ob-accounts-component with props passed to it.
   *
   * @returns {ReactElement} - An ob-accounts-component with configured props.
   */
  return (
    <ob-accounts-component
      ref={componentRef} // A ref object that will be used to attach event listeners
      showAlert={isProcessing} // Boolean prop that determines whether to show an alert
      alertText={alertText} // String prop that sets the text for the alert
      alertType="warning" // String prop that sets the type of the alert
      fontFamily="Lato" // String prop that sets the font family for the component
      componentStyles={styles} // String prop that sets the component styles
    />
  );
};

export default AccountsComponent;
