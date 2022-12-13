import { IAccountsClient } from '../interfaces';
import Account from '../models/Account';
import AccountPayload from '../payloads/AccountPayload';
import Client from './Client';
export default class AccountsClient extends Client implements IAccountsClient {
    private _path;
    private processListResponse;
    private processResponse;
    getList(userId: string): Promise<Account[]>;
    get(id: string | number): Promise<Account>;
    create(accountToCreate: AccountPayload): Promise<Account>;
    edit(id: string | number, accountToUpdate: AccountPayload): Promise<Account>;
    delete(id: string | number): Promise<boolean>;
}
