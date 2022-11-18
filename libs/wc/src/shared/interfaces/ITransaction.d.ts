export default interface Transaction {
    id: number;
    accountId?: number;
    date: number | Date;
    charge: boolean;
    description: string;
    amount: number;
    average?: number;
    quantity?: number;
    categoryId: number | null;
    dateCreated?: number | Date;
    lastUpdated?: number | Date;
}
