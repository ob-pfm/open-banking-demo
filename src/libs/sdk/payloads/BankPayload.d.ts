export interface IBankPayload {
    bankId: string;
    name: string;
    imagePath: string;
}
export default class BankPayload {
    private _bankId;
    private _name;
    private _imagePath;
    constructor(_bankId: string, _name: string, _imagePath: string);
    get bankId(): string;
    set bankId(value: string);
    get name(): string;
    set name(value: string);
    get imagePath(): string;
    set imagePath(value: string);
    toObject(): IBankPayload;
}
