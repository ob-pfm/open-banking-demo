export default interface IFinancialEntity {
    id: number;
    name: string;
    code: string;
    dateCreated?: number | Date | null;
    lastUpdated?: number | Date | null;
}
