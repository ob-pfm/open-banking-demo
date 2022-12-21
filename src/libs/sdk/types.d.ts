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
declare type Primitive = bigint | boolean | null | number | string | symbol | object | undefined;
export declare type PlainObject = Record<string, Primitive>;
export {};
