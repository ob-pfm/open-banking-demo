import { IAggSubRequest, IBanksClient } from '../interfaces';
import { Bank, BankAggStatus, ConsentCreateResponse, ConsumeConsentResponse, ResourceDetailResponse } from '../models';
import Client from './Client';
export default class BanksClient extends Client implements IBanksClient {
    private _isRunningPolling;
    private _path;
    constructor(apiKey: string, sandbox?: boolean);
    private aggStatusBankSubscribe;
    getAvailables(): Promise<Bank[]>;
    getAggregates(userId: number | string): Promise<Bank[]>;
    createConsent(bankId: string, userId: number | string, time: number | string): Promise<ConsentCreateResponse>;
    consumeConsent(authCode: string, token: string, state: string): Promise<ConsumeConsentResponse>;
    getResources(bankId: string, userId: number | string): Promise<ResourceDetailResponse>;
    getAggregationStatus(bankId: string, userId: number | string): Promise<BankAggStatus>;
    aggregationStatusSubscribe(aggSubRequest: IAggSubRequest): void;
    aggregationStatusUnsubscribe(): void;
}
