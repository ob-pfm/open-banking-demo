import IAccount from '../../shared/interfaces/IAccount';
import IFinancialEntity from '../../shared/interfaces/IFinancialEntity';
import ISharedProperties from '../../shared/interfaces/IProperties';
import ICommonProps from '../../shared/interfaces/ICommonProps';
export interface IModalRefProps {
    initializeForm?: (data?: unknown) => void;
    openModal?: (data?: unknown) => void;
}
export interface IMainProps extends ISharedProperties, ICommonProps {
    accountsData: string | IAccount[];
    financialEntitiesData: string | IFinancialEntity[];
    title: string | null;
    titleShow: string | boolean;
    newAccountDisabled: string | boolean;
    editAccountDisabled: string | boolean;
    deleteAccountDisabled: string | boolean;
    newAccountSubmitButton: string | null;
    deleteAccountButton: string | null;
    editAccountSubmitButton: string | null;
    newAccountModalTitle: string | null;
    editAccountModalTitle: string | null;
    debitAndCashSectionTitle: string | null;
    debitAndCashSectionOrder: string | number;
    debitAndCashSectionShow: string | boolean;
    creditCardAndDebtSectionTitle: string | null;
    creditCardAndDebtSectionOrder: string | number;
    creditCardAndDebtSectionShow: string | boolean;
    shortTermBalanceSectionTitle: string | null;
    shortTermBalanceSectionOrder: string | number;
    shortTermBalanceSectionShow: string | boolean;
    investmentsSectionTitle: string | null;
    investmentsSectionOrder: string | number;
    investmentsSectionShow: string | boolean;
    creditsSectionTitle: string | null;
    creditsSectionOrder: string | number;
    creditsSectionShow: string | boolean;
    longTermBalanceSectionTitle: string | null;
    longTermBalanceSectionOrder: string | number;
    longTermBalanceSectionShow: string | boolean;
    totalSectionTitle: string | null;
    totalSectionOrder: string | number;
    totalSectionShow: string | boolean;
}
export interface IBalanceItem {
    balance: number;
    className?: string;
    currencyFormatter: Intl.NumberFormat;
    text: string;
}
export interface IAccountType {
    id: string;
    name: string;
    icon: string;
}
export interface ISectionSetting {
    id: string;
    title: string;
    order: number;
    show: boolean;
}
export interface IFormValues {
    id: string;
    userId: string;
    financialEntityId: string;
    nature: string;
    name: string;
    number: string;
    balance: string;
    balanceType: string;
    chargeable: boolean;
}
export interface IBalanceTypeOption {
    label: string;
    value: string;
    color: string;
}
export interface ITermTypeOption {
    id: string;
    name: string;
    icon: string;
}
