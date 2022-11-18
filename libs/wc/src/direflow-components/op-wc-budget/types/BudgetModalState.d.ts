import Budget from '../../../shared/models/Budget';
declare type BudgetModalState = {
    state: number;
    modalOpen: boolean;
    categoryId: number | null;
    budget: Budget | null;
    subBudgets: Budget[];
    amount: number;
    name: string;
    edit: boolean;
};
export type { BudgetModalState };
