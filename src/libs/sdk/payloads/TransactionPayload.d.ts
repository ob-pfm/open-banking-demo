import { PlainObject } from '../types';
interface ITransactionPayload {
    accountId: number;
    amount: number;
    charge: boolean;
    date: Date | number;
    description: string;
    categoryId?: number;
}
export default class TransactionPayload {
    private _accountId;
    private _amount;
    private _charge;
    private _date;
    private _description;
    private _categoryId;
    constructor({ accountId, amount, charge, date, description, categoryId }: ITransactionPayload);
    get accountId(): number;
    set accountId(value: number);
    get amount(): number;
    get charge(): boolean;
    set charge(value: boolean);
    get date(): Date | number;
    set date(value: Date | number);
    get description(): string;
    get categoryId(): number | null;
    get plainObject(): PlainObject;
}
export {};
