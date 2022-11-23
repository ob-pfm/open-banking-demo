import Transaction from '../models/Transaction';
import TransactionPayload from '../payloads/TransactionPayload';
export default interface ITransactionsClient {
    getList: (accountId: string | number) => Promise<Transaction[]>;
    get: (id: string | number) => Promise<Transaction>;
    create: (transactionToCreate: TransactionPayload) => Promise<Transaction>;
    edit: (id: string | number, transactionToUpdate: TransactionPayload) => Promise<Transaction>;
    delete: (id: string | number) => Promise<boolean>;
    deleteAll: (accountId: string | number) => Promise<boolean>;
}
