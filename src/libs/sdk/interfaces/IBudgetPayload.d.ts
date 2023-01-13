export default interface IBudgetPayload {
    amount: number;
    categoryId: number;
    name: string;
    userId: number;
    warningPercentage?: number;
}
