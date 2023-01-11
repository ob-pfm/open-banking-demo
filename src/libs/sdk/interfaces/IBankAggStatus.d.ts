import { BankStatus } from '../types';
export default interface IBankAggStatus {
    bankId: string;
    userId: number;
    status: BankStatus;
}
