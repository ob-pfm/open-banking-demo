import { FC } from 'react';
import { Account, Category } from '../../../shared/models';
import { IColumnSetting } from '../interfaces';
interface IProps {
    account: Account;
    category: Category;
    charge: boolean;
    columnSettings: IColumnSetting[];
    description?: string;
    editTransactionDisabled: boolean;
    formattedAmount: string;
    formattedDate: string;
    openModal: () => void;
}
declare const TableRow: FC<IProps>;
export default TableRow;
