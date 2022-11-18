import { FC } from 'react';
interface IProps {
    balance: number;
    className: string;
    currencyFormatter: Intl.NumberFormat;
    disabled: boolean;
    formattedLastUpdated: string;
    handleClick: () => void;
    name?: string;
}
declare const AccountItem: FC<IProps>;
export default AccountItem;
