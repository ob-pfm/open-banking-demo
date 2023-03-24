import { useCallback, useEffect, useMemo, useRef } from 'react';
import { useOutletContext, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

import { Bank } from 'open-banking-pfm-sdk/models';
import { BanksClient, Account, AccountsClient, AccountPayload } from 'open-banking-pfm-sdk';
import '../../libs/wc/ob-accounts-component';
import { URL_SERVER } from '../../constants';
import { IOutletContext } from '../../interfaces';
import styles from './style.css';
import { showErrorToast } from '../../helpers';

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
  const componentRef = useRef<any>(null);
  const { isProcessing, userId, alertText, apiKey } = useOutletContext<IOutletContext>();
  const navigate = useNavigate();

  const accountServices = useMemo(() => new AccountsClient(apiKey, URL_SERVER), [apiKey]);
  const banksServices = useMemo(() => new BanksClient(apiKey, URL_SERVER), [apiKey]);

  const loadAccounts = useCallback(() => {
    if (userId) {
      componentRef.current.showMainLoading = true;
      const promises = [accountServices.getList(userId), banksServices.getAvailables()];
      Promise.all(promises)
        .then((response) => {
          const accounts: Account[] = response[0] as Account[];
          const banks: Bank[] = response[1] as unknown as Bank[];
          const bankAccount: any[] = [];
          const financialEntityIds: number[] = [...new Set(accounts.map((account) => account.financialEntityId))];

          financialEntityIds.forEach((financialEntityId) =>
            bankAccount.push({
              bank: banks.find((bank) => financialEntityId === bank.financialEntityId),
              accounts: accounts.filter((account) => account.financialEntityId === financialEntityId)
            })
          );
          componentRef.current.banksData = banks;
          componentRef.current.banksAccountData = bankAccount;
          componentRef.current.showMainLoading = false;
        })
        .catch((error) => {
          componentRef.current.banksData = [];
          componentRef.current.banksAccountData = [];
          showErrorToast(error);
        });
    }
  }, [componentRef, accountServices, banksServices, userId]);

  const handleSaveAccount = useCallback(
    (e: { detail: ISubmitEventData }) => {
      if (userId) {
        componentRef.current.showMainLoading = true;
        const { account, onSuccess } = e.detail;
        onSuccess();
        const { financialEntityId, ...rest } = account;
        const newAccount = new AccountPayload({
          userId,
          financialEntityId: parseInt(financialEntityId),
          ...rest
        });
        accountServices
          .create(newAccount)
          .then((_response: Account) => {
            loadAccounts();
            toast.success('Conta adicionada.');
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
        componentRef.current.showMainLoading = true;
        const { account, onSuccess } = e.detail;
        onSuccess();
        const { id, financialEntityId, ...rest } = account;
        const editedAccount = new AccountPayload({
          userId,
          financialEntityId: parseInt(financialEntityId),
          ...rest
        });
        accountServices
          .edit(id!, editedAccount)
          .then((_response: Account) => {
            loadAccounts();
            toast.success('Alterações salvas.');
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

  const handleDeleteAccount = useCallback(
    (e: { detail: IDeleteEventData }) => {
      componentRef.current.showMainLoading = true;
      const { accountId, onSuccess } = e.detail;
      onSuccess();
      accountServices
        .delete(accountId)
        .then((response: boolean) => {
          if (response) {
            loadAccounts();
            toast.success('Conta apagada.');
            componentRef.current.showMainLoading = false;
          }
        })
        .catch((_error) => {
          toast.error('Um erro ocorreu.');
          componentRef.current.showMainLoading = false;
        });
    },
    [accountServices, loadAccounts]
  );

  const handleClickAccount = useCallback(
    (e: { detail: IDeleteEventData }) => {
      navigate(`/pfm/movimientos?account_id=${e.detail}`);
    },
    [navigate]
  );

  useEffect(() => {
    loadAccounts();
  }, [loadAccounts]);

  useEffect(() => {
    const componentRefCurrent = componentRef.current;
    componentRefCurrent.addEventListener('save-new', handleSaveAccount);
    componentRefCurrent.addEventListener('save-edit', handleEditAccount);
    componentRefCurrent.addEventListener('delete', handleDeleteAccount);
    componentRefCurrent.addEventListener('click-account-collapsible-section', handleClickAccount);
    componentRefCurrent.componentStyles = `
      .obwc-accounts__balance-list-card .obwc-accounts__short-term-balance-item{
        display:none;
      }
      .obwc-accounts__balance-list-card .obwc-accounts__long-term-balance-item{
        display:none;
      }
    `;

    return () => {
      componentRefCurrent.removeEventListener('save-new', handleSaveAccount);
      componentRefCurrent.removeEventListener('save-edit', handleEditAccount);
      componentRefCurrent.removeEventListener('delete', handleDeleteAccount);
      componentRefCurrent.removeEventListener('click-account-collapsible-section', handleClickAccount);
    };
  }, [handleSaveAccount, handleEditAccount, handleDeleteAccount, handleClickAccount]);

  return (
    <ob-accounts-component
      ref={componentRef}
      showAlert={isProcessing}
      alertText={alertText}
      alertType="warning"
      fontFamily="Lato"
      lang="pt"
      currencyLang="pt-BR"
      currencyType="BRL"
      componentStyles={styles}
    />
  );
};

export default AccountsComponent;
