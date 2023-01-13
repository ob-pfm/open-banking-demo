export default interface IAccountPayload {
    userId: number;
    financialEntityId: number;
    nature: string;
    name: string;
    number: string;
    balance: number;
    chargeable: boolean;
}
