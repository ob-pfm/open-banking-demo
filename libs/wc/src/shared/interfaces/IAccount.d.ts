export default interface IAccount {
    id: number;
    providerId?: string | null;
    nature: string;
    name: string;
    number: string;
    balance: number;
    chargeable: boolean;
    userId?: number;
    financialEntityId?: number;
    dateCreated?: number | Date | null;
    lastUpdated?: number | Date | null;
}
