import IBalance from './IBalance';
import IIncomeExpense from './IIncomeExpense';
export default interface IResume {
    incomes: IIncomeExpense[];
    expenses: IIncomeExpense[];
    balances: IBalance[];
}
