export default interface IListOptions {
    categoryId?: number;
    description?: string;
    charge?: boolean;
    minAmount?: number;
    maxAmount?: number;
    dateFrom?: number;
    dateTo?: number;
    cursor?: number;
}
