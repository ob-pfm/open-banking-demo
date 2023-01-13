import ITransaction from './ITransaction';
export default interface ITransactionsByDate {
    date: number;
    transactions: ITransaction[];
}
