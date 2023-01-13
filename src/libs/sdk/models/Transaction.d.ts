import ITransaction from '../interfaces/ITransaction';
export default class Transaction implements ITransaction {
    private _id;
    private _date;
    private _charge;
    private _description;
    private _amount;
    private _categoryId;
    private _dateCreated;
    private _lastUpdated;
    private _accountId?;
    constructor({ id, date, charge, description, amount, categoryId, dateCreated, lastUpdated, accountId }: ITransaction);
    get id(): number;
    get date(): number;
    get charge(): boolean;
    get description(): string;
    get amount(): number;
    get categoryId(): number;
    get dateCreated(): number;
    get lastUpdated(): number;
    get accountId(): number | undefined;
    set accountId(value: number | undefined);
    toObject(): ITransaction;
}
