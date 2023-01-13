import { Analysis, Resume } from '../models';
import IInsightsOptions from './IInsightsOptions';
export default interface IInsightsClient {
    getAnalysis: (userId: number, insightsOptions?: IInsightsOptions) => Promise<Analysis[]>;
    getResume: (userId: number, insightsOptions?: IInsightsOptions) => Promise<Resume>;
}
