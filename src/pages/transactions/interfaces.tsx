export interface ITransactionFilterEvent {
  accountId: string;
  categoryId: string;
  dateFrom: string;
  dateTo: string;
  description: string;
  maxAmount: string;
  minAmount: string;
  subcategoryId: string;
  withCharges: string;
  withDebits: string;
}
