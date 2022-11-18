import { FC } from 'react';
import { Transaction } from '../../../shared/models';
import { IColumnSetting } from '../interfaces';
interface IProps {
    accountDictionary: object;
    categoryDictionary: object;
    columnSettings: IColumnSetting[];
    currencyFormatter: Intl.NumberFormat;
    editTransactionDisabled: boolean;
    initializeForm: (data?: any) => void;
    title: string;
    transactions: Transaction[];
}
declare const TableRowGroup: FC<IProps>;
export default TableRowGroup;
