import { AxiosInstance } from 'axios';
import Account from '../models/Account';
import AccountPayload from '../payloads/AccountPayload';
export default class Accounts {
    private _apiCore;
    private path;
    constructor(apiSettings: AxiosInstance);
    private processListResponse;
    private processResponse;
    getList(userId: string): Promise<Account[]>;
    get(id: string | number): Promise<Account>;
    create(accountToCreate: AccountPayload): Promise<Account>;
    edit(id: string | number, accountToUpdate: AccountPayload): Promise<Account>;
    delete(id: string | number): Promise<Account>;
}
