import ITransaction from '../interfaces/ITransaction';
export default class Transaction implements ITransaction {
    id: number;
    charge: boolean;
    constructor({ id, charge }: ITransaction);
}
