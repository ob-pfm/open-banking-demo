import Category from './Category';
import IIncomeExpense from '../../interfaces/insights/IIncomeExpense';
export default class IncomeExpense implements IIncomeExpense {
    date: number | Date;
    amount: number;
    categories: Category[];
    constructor(date: number | Date, amount: number, categories: Category[]);
    getMonthName(): string;
}
