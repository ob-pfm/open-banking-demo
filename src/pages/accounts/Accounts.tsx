import { useCallback, useEffect, useMemo, useRef } from 'react';

import { OpenBankingSDK, ACCOUNTS_TYPE, Account } from '../../../libs/sdk';
import ObAccountsComponent from '../../../libs/wc/component-exports';
import styles from './style.css';

const userId = 2230376;

const AccountsComponent = () => {
  const componentRef = useRef<any>(null);
  const accountServices = useMemo(() => {
    const obsdk = new OpenBankingSDK({
      includes: ACCOUNTS_TYPE,
      sandbox: true
    });
    const { Accounts } = obsdk.connect('XXXX-XXXX-XXXX');
    return Accounts;
  }, []);

  const getAccounts = useCallback(
    (onSuccess: () => void) => {
      if (accountServices && componentRef.current) {
        accountServices.getList(`${userId}`).then((response: Account[]) => {
          componentRef.current.accountsData = response.map((account) => account.getPlainObject());
          onSuccess();
        });
      }
    },
    [accountServices]
  );

  useEffect(() => {
    componentRef.current.showMainLoading = true;
    componentRef.current.accountsData = [];
    getAccounts(() => {
      componentRef.current.showMainLoading = false;
    });

    /*  componentRef.current.addEventListener('save-new', (e) => {
      const { balance, chargeable, financialEntityId, name, nature, number } = e.detail.account;
      const account = new AccountPayload(userId, financialEntityId, nature, name, number, balance, chargeable);
      componentRef.current.showModalLoading = true;

      Accounts.create(account)
        .then(() => {
          getAccounts(componentRef.current, () => {
            e.detail.onSuccess();
            e.detail.showToast('success', 'Nueva cuenta agregada');
            componentRef.current.showModalLoading = false;
          });
        })
        .catch(() => {
          e.detail.showToast('error', 'Error al guardar');
          componentRef.current.showModalLoading = false;
        });
    }); */

    /* componentRef.current.addEventListener('save-edit', (e) => {
      const { balance, chargeable, financialEntityId, id, name, nature, number } = e.detail.account;
      let account = new Account(userId, financialEntityId, nature, name, number, balance, chargeable);
      componentRef.current.showModalLoading = true;
      Accounts.update(id, account)
        .then(() => {
          getAccounts(componentRef.current, () => {
            e.detail.onSuccess();
            e.detail.showToast('success', 'Cambios guardados');
            componentRef.current.showModalLoading = false;
          });
        })
        .catch(() => {
          e.detail.showToast('error', 'Error al guardar');
          componentRef.current.showModalLoading = false;
        });
    }); */
  }, [getAccounts]);

  return (
    <ObAccountsComponent
      ref={componentRef}
      deleteAccountDisabled
      editAccountDisabled
      fontFamily="Lato"
      primaryColor="#ee6e73"
      componentStyles={styles}
    />
  );
};

export default AccountsComponent;
