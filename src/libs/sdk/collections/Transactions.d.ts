import { AxiosInstance } from 'axios';
import Transaction from '../models/Transaction';
import TransactionPayload from '../payloads/TransactionPayload';
export default class Transactions {
    private _apiCore;
    private path;
    constructor(apiSettings: AxiosInstance);
    private processListResponse;
    private processResponse;
    getList(accountId: string | number): Promise<Transaction[]>;
    get(id: string | number): Promise<Transaction>;
    create(transactionToCreate: TransactionPayload): Promise<Transaction>;
    edit(id: string | number, transactionToUpdate: TransactionPayload): Promise<Transaction>;
    delete(id: string | number): Promise<Transaction>;
    deleteAll(accountId: string | number): Promise<Transaction>;
}
