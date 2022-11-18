import IUser from '../interfaces/IUser';
export default class User implements IUser {
    userId: number;
    cpf: string;
    constructor({ userId, cpf }: IUser);
}
