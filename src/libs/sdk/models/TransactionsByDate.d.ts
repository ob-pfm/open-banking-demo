import ITransactionsByDate from '../interfaces/ITransactionsByDate';
import Transaction from './Transaction';
export default class TransactionsByDate implements ITransactionsByDate {
    private _date;
    private _transactions;
    constructor({ date, transactions }: ITransactionsByDate);
    get date(): number;
    get transactions(): Transaction[];
}
