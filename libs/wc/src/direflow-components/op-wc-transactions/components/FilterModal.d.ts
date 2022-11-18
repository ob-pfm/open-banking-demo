import React from 'react';
import { Account, Category } from '../../../shared/models';
import { IFieldsSetting, IFilterFormValues } from '../interfaces';
interface IProps {
    accountsData: Account[];
    categoriesData: Category[];
    chargeText: string;
    cleanFilterButtonText: string;
    customDateFilterTitle: string;
    debitText: string;
    filterModalTitle: string;
    fieldSettings: IFieldsSetting;
    fontFamily: string;
    formValues: IFilterFormValues;
    isModalOpen: boolean;
    lastFifteenDaysButtonText: string;
    lastThirtyDaysButtonText: string;
    lastWeekButtonText: string;
    onCloseModal: () => void;
    onFilterFormSubmit: (formValues: IFilterFormValues) => void;
    predefinedDateFilterTitle: string;
    resetForm: () => void;
    setFormData: (data: object) => void;
    setFormField: (newValue: any, name: string) => void;
    submitFilterButtonText: string;
}
declare const _default: React.NamedExoticComponent<IProps>;
export default _default;
