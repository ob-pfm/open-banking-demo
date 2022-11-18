import React from 'react';
import TransactionGroup from '../models/TransactionGroup';
import { IColumnSetting } from '../interfaces';
interface IProps {
    accountDictionary: object;
    categoryDictionary: object;
    columnSettings: IColumnSetting[];
    data: TransactionGroup[];
    disabled?: boolean;
    editTransactionDisabled: boolean;
    initializeForm: (data?: any) => void;
}
declare const _default: React.NamedExoticComponent<IProps>;
export default _default;
