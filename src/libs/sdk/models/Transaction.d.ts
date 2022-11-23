import ITransaction from '../interfaces/ITransaction';
import { PlainObject } from '../types';
export default class Transaction implements ITransaction {
    private _id;
    private _charge;
    constructor({ id, charge }: ITransaction);
    get id(): number;
    get charge(): boolean;
    getPlainObject(): PlainObject;
}
