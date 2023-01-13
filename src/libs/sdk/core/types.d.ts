import { Accounts, Banks, Transactions, Users } from '../collections';
declare type InitParams = {
    includes: string | string[] | undefined;
    sandbox: boolean | undefined;
};
export declare type Arg = InitParams | string[] | string | undefined;
export declare type CollectionDictionary = {
    Accounts?: Accounts;
    Banks?: Banks;
    Transactions?: Transactions;
    Users?: Users;
};
export {};
