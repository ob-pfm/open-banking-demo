import IIncomeExpense from '../interfaces/IIncomeExpense';
import CategoryInsights from './CategoryInsights';
export default class IncomeExpense implements IIncomeExpense {
    private _date;
    private _categories;
    private _amount;
    constructor({ date, categories, amount }: IIncomeExpense);
    get date(): number;
    get categories(): CategoryInsights[];
    get amount(): number;
}
