import ITransaction from '../interfaces/ITransaction';
export default class Transaction implements ITransaction {
    id: number;
    date: number | Date;
    charge: boolean;
    description: string;
    amount: number;
    categoryId: number | null;
    accountId?: number | undefined;
    dateCreated?: number | Date | undefined;
    lastUpdated?: number | Date | undefined;
    categoryName?: string | undefined;
    constructor(id: number, date: number | Date, charge: boolean, description: string, amount: number, categoryId: number | null, accountId?: number | undefined, dateCreated?: number | Date | undefined, lastUpdated?: number | Date | undefined, categoryName?: string | undefined);
    get formattedDate(): string;
    get unixDate(): number;
}
