import IAccount from '../../shared/interfaces/IAccount';
import ICategory from '../../shared/interfaces/ICategory';
import ISharedProperties from '../../shared/interfaces/IProperties';
import ITransaction from '../../shared/interfaces/ITransaction';
import ICommonProps from '../../shared/interfaces/ICommonProps';
import Transaction from '../../shared/models/Transaction';
export interface IActionProps {
    changeTransactionDuplicate: (id: string, value: boolean) => void;
}
export interface IColumnSetting {
    id: string;
    text: string;
    order: number;
    show: boolean;
}
export interface IFieldSetting {
    label: string;
    order: number;
}
export interface IFieldsSetting {
    accountField: IFieldSetting;
    amountField: IFieldSetting;
    dateField: IFieldSetting;
    descriptionField: IFieldSetting;
    categoryField: IFieldSetting;
    subcategoryField: IFieldSetting;
    typeField: IFieldSetting;
}
export interface IFormValues {
    id: string;
    amount: string;
    categoryId: string;
    subcategoryId: string;
    charge: string;
    accountId: string;
    date: string;
    description: string;
}
export interface IFilterFormValues {
    minAmount?: string;
    maxAmount?: string;
    categoryId: string;
    subcategoryId: string;
    withCharges: string;
    withDebits: string;
    accountId: string;
    dateFrom: string;
    dateTo: string;
}
export interface ICurrentFilterValues extends IFilterFormValues {
    description: string;
}
export interface IMainProps extends ISharedProperties, ICommonProps {
    transactionsData: string | ITransaction[];
    accountsData: string | IAccount[];
    categoriesData: string | ICategory[];
    isEmpty: boolean;
    title: string | null;
    titleShow: string | boolean;
    accountColumnText: string | null;
    accountColumnOrder: string | number;
    accountColumnShow: string | boolean;
    dateColumnText: string | null;
    dateColumnOrder: string | number;
    dateColumnShow: string | boolean;
    amountColumnText: string | null;
    amountColumnOrder: string | number;
    amountColumnShow: string | boolean;
    descriptionColumnText: string | null;
    descriptionColumnOrder: string | number;
    descriptionColumnShow: string | boolean;
    categoryColumnText: string | null;
    categoryColumnOrder: string | number;
    categoryColumnShow: string | boolean;
    nameFieldLabel: string | null;
    nameFieldOrder: string | number;
    categoryFieldLabel: string | null;
    categoryFieldOrder: string | number;
    subcategoryFieldLabel: string | null;
    subcategoryFieldOrder: string | number;
    ammountFieldLabel: string | null;
    ammountFieldOrder: string | number;
    transactionTypeFieldLabel: string | null;
    transactionTypeFieldOrder: string | number;
    accountFieldLabel: string | null;
    accountFieldOrder: string | number;
    dateFieldLabel: string | null;
    dateFieldOrder: string | number;
    newTransactionTitle: string | null;
    newTransactionButton: string | null;
    editTransactionTitle: string | null;
    editTransactionButton: string | null;
    deleteTransactionButtonText: string | null;
    newTransactionDisabled: string | boolean;
    editTransactionDisabled: string | boolean;
    deleteTransactionDisabled: string | boolean;
    chargeText: string | null;
    debitText: string | null;
    searchPlaceholder: string | null;
    searchDebounceTime: string | number;
    defaultFilterOptions: object;
    filterDisabled: string | boolean;
    filterModalTitle: string | null;
    cleanFilterButtonText: string | null;
    submitFilterButtonText: string | null;
    predefinedDateFilterTitle: string | null;
    customDateFilterTitle: string | null;
    lastWeekButtonText: string | null;
    lastFifteenDaysButtonText: string | null;
    lastThirtyDaysButtonText: string | null;
    emptyViewTitle: string | null;
    emptyViewDescription: string | null;
    emptyViewActionText: string | null;
}
export interface ITransactionGroup {
    id: number;
    total: number;
    title: string;
    transactions: Transaction[];
}
