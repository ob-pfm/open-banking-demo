import IResume from '../../interfaces/insights/IResume';
import Balance from './Balance';
import IncomeExpense from './IncomeExpense';
export default class Resume implements IResume {
    incomes: IncomeExpense[];
    expenses: IncomeExpense[];
    balances: Balance[];
    constructor(incomes: IncomeExpense[], expenses: IncomeExpense[], balances: Balance[]);
}
