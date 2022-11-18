import { AxiosInstance } from 'axios';
import { User, UserDetail } from '../models';
export default class Users {
    private _apiCore;
    private path;
    constructor(apiSettings: AxiosInstance);
    private processResponse;
    create(cpf: string): Promise<User>;
    get(id: string | number): Promise<UserDetail>;
}
