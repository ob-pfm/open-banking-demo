import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { useOutletContext, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

import { AccountsClient, Account, AccountPayload } from '../../libs/sdk';
import '../../libs/wc/ob-accounts-component';
import { API_KEY, URL_SERVER } from '../../constants';
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
  const { isProcessing, userId } = useOutletContext<IOutletContext>();
  const navigate = useNavigate();

  const accountServices = useMemo(() => new AccountsClient(API_KEY, URL_SERVER), []);
  const [bankAccounts, setBankAccounts] = useState<any[]>([]);
  const getAccounts = useCallback(
    (currentUserId: number, onSuccess: () => void, onError: () => void) => {
      if (accountServices && componentRef.current !== null) {
        accountServices
          .getList(currentUserId)
          .then((response: Account[]) => {
            setBankAccounts([{ bank: null, accounts: response.map((account) => account.toObject()) }]);
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
  }, [getAccounts, userId]);

  useEffect(() => {
    componentRef.current.banksAccountData = bankAccounts;
  }, [componentRef, bankAccounts]);

  useEffect(() => {
    componentRef.current.showMainLoading = isProcessing;
  }, [isProcessing]);

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
