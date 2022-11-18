import IFinancialEntity from '../interfaces/IFinancialEntity';
export default class FinancialEntity {
    private _id;
    private _name;
    private _code;
    private _dateCreated;
    private _lastUpdated;
    constructor({ id, name, code, dateCreated, lastUpdated }: IFinancialEntity);
    get id(): number;
    get name(): string;
    set name(value: string);
    get code(): string;
    set code(value: string);
    get dateCreated(): Date | null;
    get lastUpdated(): Date | null;
}
