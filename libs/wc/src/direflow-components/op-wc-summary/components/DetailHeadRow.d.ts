import { FC } from 'react';
interface IProps {
    name: string | undefined;
    currencyFormatter: Intl.NumberFormat;
    amount: number;
    color: string | undefined;
    prefixClass: string;
}
declare const DetailHeadRow: FC<IProps>;
export default DetailHeadRow;
