import Budget from '../models/Budget';
import BudgetPayload from '../payloads/BudgetPayload';
import IBudgetUpdatePayload from '../interfaces/IBudgetUpdatePayload';
export default interface IBudgetsClient {
    getList: (accountId: string | number, cursor?: string | number) => Promise<Budget[]>;
    get: (id: string | number) => Promise<Budget>;
    create: (budgetToCreate: BudgetPayload) => Promise<Budget>;
    edit: (id: string | number, budgetToUpdate: IBudgetUpdatePayload) => Promise<Budget>;
    delete: (id: string | number) => Promise<boolean>;
}
