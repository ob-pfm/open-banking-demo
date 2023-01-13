import IBudgetPayload from '../interfaces/IBudgetPayload';
export default class BudgetPayload implements IBudgetPayload {
    private _amount;
    private _categoryId;
    private _name;
    private _userId;
    private _warningPercentage?;
    constructor({ amount, categoryId, name, userId, warningPercentage }: IBudgetPayload);
    get amount(): number;
    set amount(value: number);
    get categoryId(): number;
    set categoryId(value: number);
    get name(): string;
    set name(value: string);
    get userId(): number;
    set userId(value: number);
    get warningPercentage(): number | undefined;
    set warningPercentage(value: number | undefined);
    toObject(): IBudgetPayload;
}
