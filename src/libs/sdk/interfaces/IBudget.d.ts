export default interface IBudget {
    id: number;
    amount: number;
    spent: number;
    leftToSpend: number;
    status: string;
    dateCreated: string | number;
    lastUpdated: string | number;
    categoryId: number;
    name: string;
    warningPercentage: number;
}
