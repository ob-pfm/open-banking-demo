import IAggSubRequest from './IAggSubRequest';
import { Bank, BankAggStatus, ConsentCreateResponse, ResourceDetailResponse } from '../models';
export default interface IBanksClient {
    getAvailables: () => Promise<Bank[]>;
    getAggregationStatus: (bankId: string, userId: number | string) => Promise<BankAggStatus>;
    aggregationStatusSubscribe: (aggSubRequest: IAggSubRequest) => void;
    aggregationStatusUnsubscribe: () => void;
    getConsent: (bankId: string, userId: number | string, time: number | string) => Promise<ConsentCreateResponse>;
    getResources: (bankId: string, userId: number | string) => Promise<ResourceDetailResponse>;
}
