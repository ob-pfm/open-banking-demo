import ISubcategory from '../../interfaces/insights/ISubcategory';
import Transaction from '../Transaction';
import TransactionsByDate from './TransactionsByDate';
export default class Subcategory implements ISubcategory {
    categoryId: number;
    amount: number;
    name: string | undefined;
    color: string | undefined;
    average?: number | undefined;
    quantity?: number | undefined;
    transactionsByDate?: TransactionsByDate[] | undefined;
    transactions?: Transaction[] | undefined;
    constructor(categoryId: number, amount: number, name: string | undefined, color: string | undefined, average?: number | undefined, quantity?: number | undefined, transactionsByDate?: TransactionsByDate[] | undefined, transactions?: Transaction[] | undefined);
}
