import { useCallback, useEffect, useMemo, useRef } from 'react';

import { OpenBankingSDK, ACCOUNTS_TYPE, Account } from '../../libs/sdk';
import '../../libs/wc/ob-accounts-component';
import styles from './style.css';

const userId = 2230376;
const AccountsComponent = () => {
  const componentRef = useRef<any>(null);

  const accountServices = useMemo(() => {
    const obSDK = new OpenBankingSDK({
      includes: ACCOUNTS_TYPE,
      sandbox: true
    });
    const { Accounts } = obSDK.connect('XXXX-XXXX-XXXX');
    return Accounts;
  }, []);
  const getAccounts = useCallback(
    (onSuccess: () => void) => {
      if (accountServices && componentRef.current !== null) {
        accountServices.getList(`${userId}`).then((response: Account[]) => {
          componentRef.current.accountsData = response.map((account) => account.getPlainObject());
          onSuccess();
        });
      }
    },
    [accountServices, componentRef]
  );

  useEffect(() => {
    componentRef.current.showMainLoading = true;
    componentRef.current.accountsData = [];
    getAccounts(() => {
      componentRef.current.showMainLoading = false;
    });
  }, [getAccounts]);

  return (
    <ob-accounts-component
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
