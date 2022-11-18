import IBalance from '../../interfaces/insights/IBalance';
export default class Balance implements IBalance {
    date: number | Date;
    incomes: number;
    expenses: number;
    constructor(date: number | Date, incomes: number, expenses: number);
    getMonthName(): string;
}
