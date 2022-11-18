import ITransactionByDate from '../../interfaces/insights/ITransactionsByDate';
import Transaction from '../Transaction';
export default class TransactionsByDate implements ITransactionByDate {
    date: number;
    transactions: Transaction[];
    constructor(date: number, transactions: Transaction[]);
}
