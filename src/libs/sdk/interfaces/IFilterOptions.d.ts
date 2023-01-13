export default interface IFilterOptions {
    minAmount?: string;
    maxAmount?: string;
    categoryId?: string;
    subcategoryId?: string;
    withCharges?: string;
    withDebits?: string;
    accountId?: string;
    dateFrom?: string;
    dateTo?: string;
}
