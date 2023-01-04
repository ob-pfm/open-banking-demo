import IBankAggStatus from '../interfaces/IBankAggStatus';
import { PlainObject } from '../types';
export default class BankAggStatus implements IBankAggStatus {
    private _bankId;
    private _userId;
    private _status;
    constructor({ bankId, userId, status }: IBankAggStatus);
    get bankId(): string;
    get userId(): number;
    get status(): string;
    getPlainObject(): PlainObject;
}
