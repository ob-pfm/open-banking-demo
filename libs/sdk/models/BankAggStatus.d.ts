import IBankAggStatus from '../interfaces/IBankAggStatus';
export default class BankAggStatus implements IBankAggStatus {
    bankId: string;
    userId: number;
    status: string;
    constructor({ bankId, userId, status }: IBankAggStatus);
}
