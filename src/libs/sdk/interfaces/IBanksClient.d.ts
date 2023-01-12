import IAggSubRequest from './IAggSubRequest';
import { Bank, BankAggStatus, ConsentCreateResponse, ConsumeConsentResponse, ResourceDetailResponse } from '../models';
export default interface IBanksClient {
    getAvailables: () => Promise<Bank[]>;
    getAggregationStatus: (bankId: string, userId: number | string) => Promise<BankAggStatus>;
    aggregationStatusSubscribe: (aggSubRequest: IAggSubRequest) => void;
    aggregationStatusUnsubscribe: () => void;
    createConsent: (bankId: string, userId: number | string, time: number | string) => Promise<ConsentCreateResponse>;
    consumeConsent: (authCode: string, token: string, state: string) => Promise<ConsumeConsentResponse>;
    getResources: (bankId: string, userId: number | string) => Promise<ResourceDetailResponse>;
    isRunningPolling: boolean;
}
