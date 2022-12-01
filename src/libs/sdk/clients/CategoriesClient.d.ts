import { ICategoriesClient } from '../interfaces';
import { Category } from '../models';
import CategoryPayload from '../payloads/CategoryPayload';
import Client from './Client';
export default class CategoriesClient extends Client implements ICategoriesClient {
    private _path;
    private processResponse;
    getList(userId: string | number, cursor?: string | number): Promise<Category[]>;
    get(id: string | number): Promise<Category>;
    create(categoryToCreate: CategoryPayload): Promise<Category>;
    edit(id: string | number, categoryToUpdate: CategoryPayload): Promise<Category>;
    delete(id: string | number): Promise<boolean>;
}
