import { IBudget } from '../interfaces/IBudget';
export default class Budget implements IBudget {
    id: number;
    categoryId: number;
    name: string;
    amount: number;
    warningPercentage: number;
    spent: number;
    leftToSpend: number;
    status: string;
    dateCreated: number;
    lastUpdated: number;
    subBudgets: Budget[];
    parentCategoryId: number | null;
    constructor(id: number, categoryId: number, name: string, amount: number, warningPercentage: number, spent: number, leftToSpend: number, status: string, dateCreated: number, lastUpdated: number, subBudgets: Budget[], parentCategoryId: number | null);
}
