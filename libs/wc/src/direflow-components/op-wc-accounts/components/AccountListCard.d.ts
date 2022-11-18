import { FC } from 'react';
import { Account } from '../../../shared/models';
interface IProps {
    currencyFormatter: Intl.NumberFormat;
    editAccountDisabled: boolean;
    handleOpenAccountModal: (data: Account) => void;
    accounts: Account[];
}
declare const AccountListCard: FC<IProps>;
export default AccountListCard;
