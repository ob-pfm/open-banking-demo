import Budget from '../../../shared/models/Budget';
declare enum BudgetModalActionType {
    LIST_CATEGORIES = "LIST_CATEGORIES",
    NEW_BUDGET = "NEW_BUDGET",
    OPEN_BUDGET = "OPEN_BUDGET",
    EDIT_BUDGET = "EDIT_BUDGET",
    CLOSE_MODAL = "CLOSE_MODAL"
}
declare type BudgetModalAction = {
    type: BudgetModalActionType.LIST_CATEGORIES;
    payload: null;
} | {
    type: BudgetModalActionType.NEW_BUDGET;
    payload: {
        categoryId: number;
        amount: number;
        name: string;
        budget: Budget | null;
        subBudgets: Budget[];
    };
} | {
    type: BudgetModalActionType.OPEN_BUDGET;
    payload: {
        categoryId: number;
        amount: number;
        name: string;
        budget: Budget;
        subBudgets: Budget[];
    };
} | {
    type: BudgetModalActionType.EDIT_BUDGET;
    payload: null;
} | {
    type: BudgetModalActionType.CLOSE_MODAL;
    payload: null;
};
export type { BudgetModalAction };
export { BudgetModalActionType };
