import IAggSubRequest from './IAggSubRequest';
import { Bank, BankAggStatus } from '../models';
export default interface IBanksClient {
    getAvailables: () => Promise<Bank[]>;
    getAggregationStatus: (bankId: string, userId: number | string) => Promise<BankAggStatus>;
    aggregationStatusSubscribe: (aggSubRequest: IAggSubRequest) => void;
    aggregationStatusUnsubscribe: () => void;
}
