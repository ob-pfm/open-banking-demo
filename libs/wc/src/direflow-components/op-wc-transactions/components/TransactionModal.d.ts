import React from 'react';
import { Account, Category } from '../../../shared/models';
import { ToastTrigger } from '../../../shared/types';
import { IFieldsSetting, IFormValues } from '../interfaces';
interface IProps {
    accountsData: Account[];
    categoriesData: Category[];
    chargeText: string;
    debitText: string;
    deleteTransactionDisabled: boolean;
    deleteTransactionButtonText: string;
    editTransactionButton: string;
    editTransactionTitle: string;
    fieldSettings: IFieldsSetting;
    fontFamily: string;
    formValues: IFormValues;
    isModalOpen: boolean;
    newTransactionButton: string;
    newTransactionTitle: string;
    onCloseModal: () => void;
    resetForm: () => void;
    setFormData: (data: object) => void;
    setFormField: (newValue: any, name: string) => void;
    showToast: ToastTrigger;
}
declare const _default: React.NamedExoticComponent<IProps>;
export default _default;
