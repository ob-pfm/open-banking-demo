import IBudget from '../interfaces/IBudget';
export default class Budget implements IBudget {
    private _id;
    private _amount;
    private _spent;
    private _leftToSpend;
    private _status;
    private _dateCreated;
    private _lastUpdated;
    private _categoryId;
    private _name;
    private _warningPercentage;
    constructor({ id, amount, spent, leftToSpend, status, dateCreated, lastUpdated, categoryId, name, warningPercentage }: IBudget);
    get id(): number;
    get amount(): number;
    get spent(): number;
    get leftToSpend(): number;
    get status(): string;
    get dateCreated(): number;
    get lastUpdated(): number;
    get categoryId(): number;
    get name(): string;
    get warningPercentage(): number;
    toObject(): IBudget;
}
