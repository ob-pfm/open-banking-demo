import { FC } from 'react';
import { Account } from '../../../shared/models';
interface IProps {
    accounts?: Account[];
    balance: number;
    className?: string;
    currencyFormatter: Intl.NumberFormat;
    name: string;
    title: string;
}
declare const CollapsibleSection: FC<IProps>;
export default CollapsibleSection;
