import { FC } from 'react';
interface IProps {
    className?: string;
    balance: number;
    currencyFormatter: Intl.NumberFormat;
}
declare const BalanceText: FC<IProps>;
export default BalanceText;
