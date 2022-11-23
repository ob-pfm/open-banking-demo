import { IAggSubRequest, IBanksClient } from '../interfaces';
import { Bank, BankAggStatus } from '../models';
import Client from './Client';
export default class BanksClient extends Client implements IBanksClient {
    private _isRunningPolling;
    private _path;
    constructor(apiKey: string, sandbox?: boolean);
    private aggStatusBankSubscribe;
    getAvailables(): Promise<Bank[]>;
    getAggregationStatus(bankId: string, userId: number | string): Promise<BankAggStatus>;
    aggregationStatusSubscribe(aggSubRequest: IAggSubRequest): void;
    aggregationStatusUnsubscribe(): void;
}
