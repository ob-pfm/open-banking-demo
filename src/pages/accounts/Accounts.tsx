import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { useOutletContext, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

import { AccountsClient, Account, AccountPayload, BanksClient } from 'open-banking-pfm-sdk';
import { Bank, BankAggregated } from 'open-banking-pfm-sdk/models';
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
  const [bankAccounts, setBankAccounts] = useState<any[]>([]);

  const handleSaveAccount = useCallback(
    (e: { detail: ISubmitEventData }) => {
      if (userId) {
        const { account, onSuccess } = e.detail;
        const { financialEntityId, ...rest } = account;
        const newAccount = new AccountPayload({
          userId,
          financialEntityId: parseInt(financialEntityId),
          ...rest
        });
        accountServices.create(newAccount).then((response: Account) => {
          toast.success('Conta adicionada.');
          setBankAccounts([response.toObject(), ...bankAccounts]);
          onSuccess();
        });
      }
    },
    [accountServices, bankAccounts, userId]
  );

  const handleEditAccount = useCallback(
    (e: { detail: ISubmitEventData }) => {
      if (userId) {
        const { account, onSuccess } = e.detail;
        const { id, financialEntityId, ...rest } = account;
        const editedAccount = new AccountPayload({
          userId,
          financialEntityId: parseInt(financialEntityId),
          ...rest
        });
        accountServices.edit(id!, editedAccount).then((response: Account) => {
          toast.success('Alterações salvas.');
          setBankAccounts(
            bankAccounts.map((accountItem) => {
              if (accountItem.id === id) {
                return response.toObject();
              }
              return accountItem;
            })
          );
          onSuccess();
        });
      }
    },
    [accountServices, bankAccounts, userId]
  );

  const handleDeleteAccount = useCallback(
    (e: { detail: IDeleteEventData }) => {
      const { accountId, onSuccess } = e.detail;
      accountServices.delete(accountId).then((response: boolean) => {
        if (response) {
          toast.success('Conta apagada.');
          setBankAccounts(bankAccounts.filter((accountItem) => accountItem.id !== accountId));
          onSuccess();
        }
      });
    },
    [accountServices, bankAccounts]
  );

  const handleClickAccount = useCallback(
    (e: { detail: IDeleteEventData }) => {
      navigate(`/pfm/movimientos?account_id=${e.detail}`);
    },
    [navigate]
  );

  useEffect(() => {
    if (userId) {
      componentRef.current.showMainLoading = true;
      const promises = [
        accountServices.getList(userId),
        banksServices.getAggregates(userId),
        banksServices.getAvailables()
      ];
      Promise.all(promises)
        .then((response) => {
          const accounts: Account[] = response[0] as Account[];
          const aggregated: BankAggregated[] = response[1] as BankAggregated[];
          const banks: Bank[] = response[2] as unknown as Bank[];
          const bankAccount: any[] = [];
          aggregated.forEach((bankAgg) =>
            bankAccount.push({
              bank: banks.find((bank) => bankAgg.targetInstitution === bank.bankId),
              accounts
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

  useEffect(() => {
    const componentRefCurrent = componentRef.current;
    componentRefCurrent.addEventListener('save-new', handleSaveAccount);
    componentRefCurrent.addEventListener('save-edit', handleEditAccount);
    componentRefCurrent.addEventListener('delete', handleDeleteAccount);
    componentRefCurrent.addEventListener('click-account-collapsible-section', handleClickAccount);

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
