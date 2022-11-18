import { ITransactionGroup } from '../interfaces';
import Transaction from '../../../shared/models/Transaction';
export default class TransactionGroup implements ITransactionGroup {
    id: number;
    total: number;
    title: string;
    transactions: Transaction[];
    constructor(id: number, total: number, title: string, transactions: Transaction[]);
}
