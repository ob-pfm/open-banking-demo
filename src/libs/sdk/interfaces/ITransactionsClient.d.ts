import Transaction from '../models/Transaction';
import TransactionPayload from '../payloads/TransactionPayload';
import IListOptions from './IListOptions';
import ITransactionUpdatePayload from '../interfaces/ITransactionUpdatePayload';
export default interface ITransactionsClient {
    getList: (accountId: number, listOptions?: IListOptions) => Promise<{
        data: Transaction[];
        nextCursor: number;
    }>;
    get: (id: string | number) => Promise<Transaction>;
    create: (transactionToCreate: TransactionPayload) => Promise<Transaction>;
    edit: (id: string | number, transactionToUpdate: ITransactionUpdatePayload) => Promise<Transaction>;
    delete: (id: string | number) => Promise<boolean>;
    deleteAll: (accountId: number) => Promise<boolean>;
}
