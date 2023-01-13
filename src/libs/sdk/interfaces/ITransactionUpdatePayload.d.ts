export default interface ITransactionUpdatePayload {
    amount?: number;
    charge?: boolean;
    date?: number;
    description?: string;
    categoryId?: number;
}
