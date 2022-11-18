import { Account } from '../../shared/models';
import { Dictionary } from '../../shared/types';
export declare const getAccountBalanceTotal: (accounts: Account[]) => number;
export declare const getRealBalance: (balance: string, balanceType: string) => number;
export declare const buildSectionSettings: (langTexts: Dictionary, { debitAndCashSectionTitle, debitAndCashSectionOrder, debitAndCashSectionShow, creditCardAndDebtSectionTitle, creditCardAndDebtSectionOrder, creditCardAndDebtSectionShow, shortTermBalanceSectionTitle, shortTermBalanceSectionOrder, shortTermBalanceSectionShow, investmentsSectionTitle, investmentsSectionOrder, investmentsSectionShow, creditsSectionTitle, creditsSectionOrder, creditsSectionShow, longTermBalanceSectionTitle, longTermBalanceSectionOrder, longTermBalanceSectionShow, totalSectionTitle, totalSectionOrder, totalSectionShow }: {
    debitAndCashSectionTitle: any;
    debitAndCashSectionOrder: any;
    debitAndCashSectionShow: any;
    creditCardAndDebtSectionTitle: any;
    creditCardAndDebtSectionOrder: any;
    creditCardAndDebtSectionShow: any;
    shortTermBalanceSectionTitle: any;
    shortTermBalanceSectionOrder: any;
    shortTermBalanceSectionShow: any;
    investmentsSectionTitle: any;
    investmentsSectionOrder: any;
    investmentsSectionShow: any;
    creditsSectionTitle: any;
    creditsSectionOrder: any;
    creditsSectionShow: any;
    longTermBalanceSectionTitle: any;
    longTermBalanceSectionOrder: any;
    longTermBalanceSectionShow: any;
    totalSectionTitle: any;
    totalSectionOrder: any;
    totalSectionShow: any;
}) => {
    id: string;
    title: any;
    order: number;
    show: boolean;
}[];
export declare const getTypeOptions: (langTexts: Dictionary) => {
    termTypeOptions: {
        id: string;
        name: string;
        icon: string;
    }[];
    balanceTypeOptions: {
        label: string;
        value: string;
        color: string;
    }[];
};
