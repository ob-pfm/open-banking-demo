import ISubategoryInsights from '../interfaces/ISubategoryInsights';
import Transaction from './Transaction';
import TransactionsByDate from './TransactionsByDate';
export default class SubcategoryInsights implements ISubategoryInsights {
    private _categoryId;
    private _amount;
    private _average?;
    private _quantity?;
    private _transactionsByDate?;
    private _transactions?;
    constructor({ categoryId, amount, average, quantity, transactionsByDate, transactions }: ISubategoryInsights);
    get categoryId(): number;
    get amount(): number;
    get average(): number | undefined;
    get quantity(): number | undefined;
    get transactionsByDate(): TransactionsByDate[] | undefined;
    get transactions(): Transaction[] | undefined;
}
