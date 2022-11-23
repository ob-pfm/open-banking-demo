import IAccountsClient from './interfaces/IAccountsClient';
import IBanksClient from './interfaces/IBanksClient';
import ITransactionsClient from './interfaces/ITransactionsClient';
import IUsersClient from './interfaces/IUsersClient';
export declare type ClientDictionary = {
    accountsClient?: IAccountsClient;
    banksClient?: IBanksClient;
    transactionsClient?: ITransactionsClient;
    usersClient?: IUsersClient;
};
declare type Primitive = bigint | boolean | null | number | string | symbol | object | undefined;
export declare type PlainObject = Record<string, Primitive>;
export {};
