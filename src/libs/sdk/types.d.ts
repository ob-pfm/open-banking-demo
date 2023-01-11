import { IAccountsClient, IBanksClient, IBudgetsClient, ICategoriesClient, IInsightsClient, ITransactionsClient, IUsersClient } from './interfaces';
export declare type ClientDictionary = {
    accountsClient: IAccountsClient;
    banksClient: IBanksClient;
    budgetsClient: IBudgetsClient;
    categoriesClient: ICategoriesClient;
    insightsClient: IInsightsClient;
    transactionsClient: ITransactionsClient;
    usersClient: IUsersClient;
};
export declare type BankStatus = 'CONSENT_REQUESTED' | 'CONSENT_GRANTED' | 'CONSENT_DELETED' | 'AGGREGATION_STARTED' | 'AGGREGATION_COMPLETED' | 'PROCESS_FAILED';
