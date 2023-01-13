import IUser from '../interfaces/IUser';
export default class User implements IUser {
    private _userId;
    private _cpf;
    constructor({ userId, cpf }: IUser);
    get userId(): number;
    get cpf(): string;
    toObject(): IUser;
}
