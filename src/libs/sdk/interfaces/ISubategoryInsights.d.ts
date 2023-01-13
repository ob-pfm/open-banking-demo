import ITransaction from './ITransaction';
import ITransactionsByDate from './ITransactionsByDate';
export default interface ISubategoryInsights {
    categoryId: number;
    amount: number;
    average?: number;
    quantity?: number;
    transactionsByDate?: ITransactionsByDate[];
    transactions?: ITransaction[];
}
