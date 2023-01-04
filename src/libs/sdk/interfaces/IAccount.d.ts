export default interface IAccount {
    id: number;
    providerId?: string | null;
    nature: string;
    name: string;
    number: string;
    balance: number;
    chargeable: boolean;
    dateCreated: string;
    lastUpdated: string;
}
