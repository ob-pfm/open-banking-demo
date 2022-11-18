import { Dictionary } from '../../shared/types';
export declare const buildColumnsSettings: (langTexts: Dictionary, { accountColumnText, accountColumnOrder, accountColumnShow, dateColumnText, dateColumnOrder, dateColumnShow, amountColumnText, amountColumnOrder, amountColumnShow, descriptionColumnText, descriptionColumnOrder, descriptionColumnShow, categoryColumnText, categoryColumnOrder, categoryColumnShow }: {
    accountColumnText: any;
    accountColumnOrder: any;
    accountColumnShow: any;
    dateColumnText: any;
    dateColumnOrder: any;
    dateColumnShow: any;
    amountColumnText: any;
    amountColumnOrder: any;
    amountColumnShow: any;
    descriptionColumnText: any;
    descriptionColumnOrder: any;
    descriptionColumnShow: any;
    categoryColumnText: any;
    categoryColumnOrder: any;
    categoryColumnShow: any;
}) => {
    id: string;
    text: any;
    order: number;
    show: boolean;
}[];
export declare const buildFieldsSettings: (langTexts: Dictionary, { accountFieldLabel, accountFieldOrder, ammountFieldLabel, ammountFieldOrder, categoryFieldLabel, categoryFieldOrder, dateFieldLabel, dateFieldOrder, transactionTypeFieldLabel, transactionTypeFieldOrder, nameFieldLabel, nameFieldOrder, subcategoryFieldLabel, subcategoryFieldOrder }: {
    accountFieldLabel: any;
    accountFieldOrder: any;
    ammountFieldLabel: any;
    ammountFieldOrder: any;
    categoryFieldLabel: any;
    categoryFieldOrder: any;
    dateFieldLabel: any;
    dateFieldOrder: any;
    transactionTypeFieldLabel: any;
    transactionTypeFieldOrder: any;
    nameFieldLabel: any;
    nameFieldOrder: any;
    subcategoryFieldLabel: any;
    subcategoryFieldOrder: any;
}) => {
    accountField: {
        label: any;
        order: number;
    };
    amountField: {
        label: any;
        order: number;
    };
    dateField: {
        label: any;
        order: number;
    };
    descriptionField: {
        label: any;
        order: number;
    };
    categoryField: {
        label: any;
        order: number;
    };
    subcategoryField: {
        label: any;
        order: number;
    };
    typeField: {
        label: any;
        order: number;
    };
};
