export default interface ITransactionPayload {
    accountId: number;
    amount: number;
    charge: boolean;
    date: number;
    description: string;
    categoryId?: number;
}
