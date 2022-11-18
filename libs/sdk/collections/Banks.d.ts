import { AxiosInstance } from 'axios';
import { Bank, BankAggStatus } from '../models';
interface IAggSubRequest {
    bankId: string;
    userId: number | string;
    onCompletedStatus?: () => void;
    onInProcessStatus?: () => void;
    onFailedStatus?: () => void;
    onServerError?: (response: unknown) => void;
}
export default class Banks {
    private _apiCore;
    private _isRunningPolling;
    private path;
    constructor(apiSettings: AxiosInstance);
    private aggStatusBankSubscribe;
    getAvailables(): Promise<Bank[]>;
    getAggregationStatus(bankId: string, userId: number | string): Promise<BankAggStatus>;
    aggregationStatusSubscribe(aggSubRequest: IAggSubRequest): void;
    aggregationStatusUnsubscribe(): void;
}
export {};
