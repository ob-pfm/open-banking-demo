import { IBudgetsClient, IBudgetUpdatePayload } from '../interfaces';
import Budget from '../models/Budget';
import BudgetPayload from '../payloads/BudgetPayload';
import Client from './Client';
export default class BudgetsClient extends Client implements IBudgetsClient {
    private _path;
    private processListResponse;
    private processResponse;
    getList(userId: string | number, cursor?: string | number): Promise<Budget[]>;
    get(id: string | number): Promise<Budget>;
    create(budgetToCreate: BudgetPayload): Promise<Budget>;
    edit(id: string | number, budgetToUpdate: IBudgetUpdatePayload): Promise<Budget>;
    delete(id: string | number): Promise<boolean>;
}
