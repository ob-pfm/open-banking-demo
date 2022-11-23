import IUserDetail from '../interfaces/IUserDetail';
import { PlainObject } from '../types';
export default class UserDetail implements IUserDetail {
    private _id;
    private _cpf;
    private _dateCreated;
    constructor({ id, cpf, dateCreated }: IUserDetail);
    get id(): number;
    get cpf(): string;
    get dateCreated(): string;
    getPlainObject(): PlainObject;
}
