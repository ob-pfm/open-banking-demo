import ITransaction from '../ITransaction';
import ITransactionByDate from './ITransactionsByDate';
export default interface ISubcategory {
    categoryId: number;
    amount: number;
    average?: number;
    quantity?: number;
    transactionsByDate?: ITransactionByDate[];
    transactions?: ITransaction[];
}
