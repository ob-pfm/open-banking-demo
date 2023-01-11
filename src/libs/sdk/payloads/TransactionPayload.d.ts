import ITransactionPayload from '../interfaces/ITransactionPayload';
export default class TransactionPayload implements ITransactionPayload {
    private _accountId;
    private _amount;
    private _charge;
    private _date;
    private _description;
    private _categoryId?;
    constructor({ accountId, amount, charge, date, description, categoryId }: ITransactionPayload);
    get accountId(): number;
    set accountId(value: number);
    get amount(): number;
    set amount(value: number);
    get charge(): boolean;
    set charge(value: boolean);
    get date(): number;
    set date(value: number);
    get description(): string;
    set description(value: string);
    get categoryId(): number | undefined;
    set categoryId(value: number | undefined);
    toObject(): ITransactionPayload;
}
