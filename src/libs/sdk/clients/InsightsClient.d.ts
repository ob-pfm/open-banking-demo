import { IInsightsClient, IInsightsOptions } from '../interfaces';
import { Analysis, Resume } from '../models';
import Client from './Client';
export default class InsightsClient extends Client implements IInsightsClient {
    private _path;
    getAnalysis(userId: number, insightsOptions?: IInsightsOptions): Promise<Analysis[]>;
    getResume(userId: number, insightsOptions?: IInsightsOptions): Promise<Resume>;
}
