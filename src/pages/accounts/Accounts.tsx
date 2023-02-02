import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { useOutletContext } from 'react-router-dom';
import { toast } from 'react-toastify';

import { AccountsClient, Account, AccountPayload } from 'open-banking-pfm-sdk';
import { IAccount } from 'open-banking-pfm-sdk/interfaces';
import { API_KEY, SERVER_URL } from '../../constants';
import { IOutletContext } from '../../interfaces';
import styles from './style.css';
import { showErrorToast } from '../../helpers';

const FINANCIAL_ENTITIES = [
  {
    id: 1115178,
    dateCreated: 1645212328040,
    lastUpdated: 1645212328040,
    name: 'Kuhic Group',
    code: 'GXNEKNN1'
  },
  {
    id: 1115177,
    dateCreated: 1645211573026,
    lastUpdated: 1645211573026,
    name: 'Rutherford, Connelly and Walker',
    code: 'TLSABMB1741'
  },
  {
    id: 1115176,
    dateCreated: 1645211391192,
    lastUpdated: 1645211391192,
    name: 'Friesen - Feil',
    code: 'QFFOUGO1056'
  },
  {
    id: 1115175,
    dateCreated: 1645207289843,
    lastUpdated: 1645207289843,
    name: 'Shanahan - Swift',
    code: 'XUNAZWV1101'
  },
  {
    id: 1115173,
    dateCreated: 1645206949178,
    lastUpdated: 1645206949178,
    name: 'Blanda Inc',
    code: 'YJTABGL1079'
  },
  {
    id: 1115171,
    dateCreated: 1645206890169,
    lastUpdated: 1645206890169,
    name: 'Feest Inc',
    code: 'SSROCDE1'
  }
];

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
  const { alertIsShown, alertText, userId } = useOutletContext<IOutletContext>();
  const accountServices = useMemo(() => new AccountsClient(API_KEY, SERVER_URL), []);
  const [accounts, setAccounts] = useState<IAccount[]>([]);
  const getAccounts = useCallback(
    (currentUserId: number, onSuccess: () => void, onError: () => void) => {
      if (accountServices && componentRef.current !== null) {
        accountServices
          .getList(currentUserId)
          .then((response: Account[]) => {
            setAccounts(response.map((account) => account.toObject()));
            onSuccess();
          })
          .catch((error) => {
            showErrorToast(error);
            onError();
          });
      }
    },
    [accountServices, componentRef]
  );

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
          setAccounts([response.toObject(), ...accounts]);
          onSuccess();
        });
      }
    },
    [accountServices, accounts, userId]
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
          setAccounts(
            accounts.map((accountItem) => {
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
    [accountServices, accounts, userId]
  );

  const handleDeleteAccount = useCallback(
    (e: { detail: IDeleteEventData }) => {
      const { accountId, onSuccess } = e.detail;
      accountServices.delete(accountId).then((response: boolean) => {
        if (response) {
          toast.success('Conta apagada.');
          setAccounts(accounts.filter((accountItem) => accountItem.id !== accountId));
          onSuccess();
        }
      });
    },
    [accountServices, accounts]
  );
  useEffect(() => {
    if (userId) {
      componentRef.current.showMainLoading = true;
      componentRef.current.financialEntitiesData = FINANCIAL_ENTITIES;
      getAccounts(
        userId,
        () => {
          componentRef.current.showMainLoading = false;
        },
        () => {
          componentRef.current.showMainLoading = false;
        }
      );
    }
  }, [getAccounts]);

  useEffect(() => {
    componentRef.current.accountsData = accounts;
  }, [componentRef, accounts]);

  useEffect(() => {
    const componentRefCurrent = componentRef.current;
    componentRefCurrent.addEventListener('save-new', handleSaveAccount);
    componentRefCurrent.addEventListener('save-edit', handleEditAccount);
    componentRefCurrent.addEventListener('delete', handleDeleteAccount);

    return () => {
      componentRefCurrent.removeEventListener('save-new', handleSaveAccount);
      componentRefCurrent.removeEventListener('save-edit', handleEditAccount);
      componentRefCurrent.removeEventListener('delete', handleDeleteAccount);
    };
  }, [handleSaveAccount, handleEditAccount, handleDeleteAccount]);

  return (
    <ob-accounts-component
      ref={componentRef}
      alertType="warning"
      showAlert={alertIsShown}
      alertText={alertText}
      fontFamily="Lato"
      lang="pt"
      currencyLang="pt-BR"
      currencyType="BRL"
      componentStyles={styles}
    />
  );
};

export default AccountsComponent;
