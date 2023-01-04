import { User, UserDetail } from '../models';
export default interface IUsersClient {
    create: (cpf: string) => Promise<User>;
    get: (id: string | number) => Promise<UserDetail>;
}
