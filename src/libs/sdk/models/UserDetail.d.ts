import IUserDetail from '../interfaces/IUserDetail';
export default class UserDetail implements IUserDetail {
    id: number;
    cpf: string;
    dateCreated: string;
    constructor({ id, cpf, dateCreated }: IUserDetail);
}
