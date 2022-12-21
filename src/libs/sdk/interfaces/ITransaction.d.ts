export default interface ITransaction {
    id: number;
    date: string | number;
    charge: boolean;
    description: string;
    amount: number;
    categoryId: number;
    dateCreated: string | number;
    lastUpdated: string | number;
    accountId?: number;
}
