import IBalance from '../interfaces/IBalance';
export default class Balance implements IBalance {
    private _date;
    private _incomes;
    private _expenses;
    constructor({ date, incomes, expenses }: IBalance);
    get date(): number;
    set date(date: number);
    get incomes(): number;
    set incomes(incomes: number);
    get expenses(): number;
    set expenses(expenses: number);
}
