import React from 'react';
import { FinancialEntity } from '../../../shared/models';
import { IFormValues, IBalanceTypeOption, ITermTypeOption } from '../interfaces';
interface IProps {
    className: string;
    balanceFieldLabel: string;
    balanceTypeFieldLabel: string;
    balanceTypeOptions: IBalanceTypeOption[];
    chargeableFieldLabel: string;
    deleteButton: string;
    deleteDisabled: boolean;
    formValues: IFormValues;
    financialEntitiesData: FinancialEntity[];
    financialEntityFieldLabel: string;
    onCloseModal: () => void;
    isModalOpen: boolean;
    editModalTitle: string;
    editSubmitButton: string;
    nameFieldLabel: string;
    natureFieldLabel: string;
    newModalTitle: string;
    newSubmitButton: string;
    numberFieldLabel: string;
    resetForm: () => void;
    setFormField: (newValue: unknown, name: string) => void;
    termTypeOptions: ITermTypeOption[];
}
declare const _default: React.NamedExoticComponent<IProps>;
export default _default;
