import ICategoryInsights from './ICategoryInsights';
export default interface IIncomeExpense {
    date: number;
    categories: ICategoryInsights[];
    amount: number;
}
