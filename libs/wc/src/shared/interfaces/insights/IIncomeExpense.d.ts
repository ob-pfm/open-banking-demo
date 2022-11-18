import ICategory from './ICategory';
export default interface IIncomeExpense {
    date: number | Date;
    amount: number;
    categories: ICategory[];
}
