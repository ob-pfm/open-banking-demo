import IResumeResponse from '../interfaces/IResumeResponse';
import Balance from './Balance';
import IncomeExpense from './IncomeExpense';
export default class Resume implements IResumeResponse {
    private _incomes;
    private _expenses;
    private _balances;
    constructor({ incomes, expenses, balances }: IResumeResponse);
    get incomes(): IncomeExpense[];
    get expenses(): IncomeExpense[];
    get balances(): Balance[];
}
