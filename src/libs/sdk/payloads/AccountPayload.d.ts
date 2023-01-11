import IAccountPayload from '../interfaces/IAccountPayload';
export default class AccountPayload implements IAccountPayload {
    private _userId;
    private _financialEntityId;
    private _nature;
    private _name;
    private _number;
    private _balance;
    private _chargeable;
    constructor({ userId, financialEntityId, nature, name, number, balance, chargeable }: IAccountPayload);
    get userId(): number;
    set userId(value: number);
    get financialEntityId(): number;
    set financialEntityId(value: number);
    get nature(): string;
    set nature(value: string);
    get name(): string;
    set name(value: string);
    get number(): string;
    set number(value: string);
    get balance(): number;
    set balance(value: number);
    get chargeable(): boolean;
    set chargeable(value: boolean);
    toObject(): IAccountPayload;
}
