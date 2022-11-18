import IAccount from '../interfaces/IAccount';
import { PlainObject } from '../types';
export default class Account implements IAccount {
    private _id;
    private _providerId;
    private _nature;
    private _name;
    private _number;
    private _balance;
    private _chargeable;
    private _dateCreated;
    private _lastUpdated;
    constructor({ id, providerId, nature, name, number, balance, chargeable, dateCreated, lastUpdated }: IAccount);
    get id(): number;
    get providerId(): string | null;
    get nature(): string;
    get name(): string;
    get number(): string;
    get balance(): number;
    get chargeable(): boolean;
    get dateCreated(): string;
    get lastUpdated(): string;
    getPlainObject(): PlainObject;
}
