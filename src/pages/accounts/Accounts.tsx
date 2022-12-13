import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { useOutletContext } from 'react-router-dom';
import { toast } from 'react-toastify';

import {
  AccountsClient,
  Account,
  AccountPayload,
  CONSENT_REQUESTED_STATUS,
  CONSENT_GRANTED_STATUS,
  CONSENT_DELETED_STATUS,
  AGGREGATION_STARTED_STATUS,
  AGGREGATION_COMPLETED_STATUS,
  PROCESS_FAILED_STATUS
} from '../../libs/sdk';
import { PlainObject } from '../../libs/sdk/types';
import '../../libs/wc/ob-accounts-component';
import styles from './style.css';

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

const userId = 2230376;
interface ISubmitEventData {
  account: {
    id?: string;
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
  accountId: string;
  onSuccess: () => void;
}
const AccountsComponent = () => {
  const componentRef = useRef<any>(null);
  const { aggStatus } = useOutletContext<{ aggStatus: string | null }>();
  const accountServices = useMemo(() => new AccountsClient('XXXX-XXXX-XXXX', true), []);
  const [accounts, setAccounts] = useState<PlainObject[]>([]);
  const getAccounts = useCallback(
    (onSuccess: () => void) => {
      if (accountServices && componentRef.current !== null) {
        accountServices.getList(`${userId}`).then((response: Account[]) => {
          setAccounts(response.map((account) => account.getPlainObject()));
          onSuccess();
        });
      }
    },
    [accountServices, componentRef]
  );

  const handleSaveAccount = useCallback(
    (e: { detail: ISubmitEventData }) => {
      const { account, onSuccess } = e.detail;
      const { financialEntityId, ...rest } = account;
      const newAccount = new AccountPayload({ userId, financialEntityId: parseInt(financialEntityId), ...rest });
      accountServices.create(newAccount).then((response: Account) => {
        toast.success('Conta adicionada.');
        setAccounts([response.getPlainObject(), ...accounts]);
        onSuccess();
      });
    },
    [accountServices, accounts]
  );

  const handleEditAccount = useCallback(
    (e: { detail: ISubmitEventData }) => {
      const { account, onSuccess } = e.detail;
      const { id, financialEntityId, ...rest } = account;
      const editedAccount = new AccountPayload({ userId, financialEntityId: parseInt(financialEntityId), ...rest });
      accountServices.edit(id!, editedAccount).then((response: Account) => {
        toast.success('Alterações salvas.');
        setAccounts(
          accounts.map((accountItem) => {
            if (accountItem.id === id) {
              return response.getPlainObject();
            }
            return accountItem;
          })
        );
        onSuccess();
      });
    },
    [accountServices, accounts]
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
    componentRef.current.showMainLoading = true;
    componentRef.current.financialEntitiesData = FINANCIAL_ENTITIES;
    getAccounts(() => {
      componentRef.current.showMainLoading = false;
    });
  }, [getAccounts]);

  useEffect(() => {
    componentRef.current.accountsData = accounts;
  }, [componentRef, accounts]);

  useEffect(() => {
    switch (aggStatus) {
      case CONSENT_REQUESTED_STATUS:
        toast.info('Consentimento solicitado.');
        break;
      case CONSENT_GRANTED_STATUS:
        toast.success('Consentimento concedido.');
        break;
      case CONSENT_DELETED_STATUS:
        toast.warn('Consentimento removido.');
        break;
      case AGGREGATION_STARTED_STATUS:
        componentRef.current.alertType = 'warning';
        componentRef.current.alertText = 'Agregação de banco em processo...';
        componentRef.current.showAlert = true;
        break;
      case AGGREGATION_COMPLETED_STATUS:
        if (componentRef.current.showAlert) {
          componentRef.current.showAlert = false;
        }
        toast.success('Agregação de banco finalizada.');
        break;
      case PROCESS_FAILED_STATUS:
        if (componentRef.current.showAlert) {
          componentRef.current.showAlert = false;
        }
        toast.error('Consentimento removido.');
        break;
      default:
        break;
    }
  }, [aggStatus]);

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
      fontFamily="Lato"
      lang="pt"
      currencyLang="pt-BR"
      currencyType="BRL"
      componentStyles={styles}
    />
  );
};

export default AccountsComponent;
