export interface IBudget {
    id: number;
    categoryId: number;
    name: string;
    amount: number;
    warningPercentage: number;
    spent: number;
    leftToSpend: number;
    status: string;
    dateCreated: number;
    lastUpdated: number;
}
