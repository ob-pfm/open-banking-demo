import ITransaction from '../ITransaction';
export default interface ITransactionByDate {
    date: number;
    transactions: ITransaction[] | null;
}
