import IBankAggStatus from '../interfaces/IBankAggStatus';
import { BankStatus } from '../types';
export default class BankAggStatus implements IBankAggStatus {
    private _bankId;
    private _userId;
    private _status;
    constructor({ bankId, userId, status }: IBankAggStatus);
    get bankId(): string;
    get userId(): number;
    get status(): BankStatus;
    toObject(): IBankAggStatus;
}
