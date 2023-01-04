import { IUsersClient } from '../interfaces';
import { User, UserDetail } from '../models';
import Client from './Client';
export default class UsersClient extends Client implements IUsersClient {
    private processResponse;
    create(cpf: string): Promise<User>;
    get(id: string | number): Promise<UserDetail>;
}
