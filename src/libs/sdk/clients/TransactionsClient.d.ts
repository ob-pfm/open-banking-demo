import { ITransactionsClient } from '../interfaces';
import Transaction from '../models/Transaction';
import TransactionPayload from '../payloads/TransactionPayload';
import Client from './Client';
export default class TransactionsClient extends Client implements ITransactionsClient {
    private _path;
    private processListResponse;
    private processResponse;
    getList(accountId: string | number): Promise<Transaction[]>;
    get(id: string | number): Promise<Transaction>;
    create(transactionToCreate: TransactionPayload): Promise<Transaction>;
    edit(id: string | number, transactionToUpdate: TransactionPayload): Promise<Transaction>;
    delete(id: string | number): Promise<boolean>;
    deleteAll(accountId: string | number): Promise<boolean>;
}
