import { Category } from '../models';
import CategoryPayload from '../payloads/CategoryPayload';
export default interface IBanksClient {
    getList: (userId: string | number, cursor?: string | number) => Promise<Category[]>;
    get: (id: string | number) => Promise<Category>;
    create: (transactionToCreate: CategoryPayload) => Promise<Category>;
    edit: (id: string | number, transactionToUpdate: CategoryPayload) => Promise<Category>;
    delete: (id: string | number) => Promise<boolean>;
}
