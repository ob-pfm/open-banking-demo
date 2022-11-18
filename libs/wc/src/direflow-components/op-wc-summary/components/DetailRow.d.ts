import { FC } from 'react';
interface IProps {
    type: string;
    description: string;
    currencyFormatter: Intl.NumberFormat;
    category?: string | undefined;
    date?: number | Date;
    amount?: number;
    average?: number;
    quantity?: number;
    total?: number;
    prefixClass: string;
}
declare const DetailRow: FC<IProps>;
export default DetailRow;
