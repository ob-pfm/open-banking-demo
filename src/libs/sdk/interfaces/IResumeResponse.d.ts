import IBalance from './IBalance';
import IIncomeExpense from './IIncomeExpense';
export default interface IResumeResponse {
    incomes: IIncomeExpense[];
    expenses: IIncomeExpense[];
    balances: IBalance[];
}
