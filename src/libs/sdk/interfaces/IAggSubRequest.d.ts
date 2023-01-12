import { BankStatus } from '../types';
export default interface IAggSubRequest {
    bankId: string;
    userId: number | string;
    time?: number;
    onResponse: (status: BankStatus) => void;
    onError?: (response: unknown) => void;
}
