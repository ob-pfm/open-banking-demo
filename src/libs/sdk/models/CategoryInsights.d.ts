import ICategoryInsights from '../interfaces/ICategoryInsights';
import Transaction from './Transaction';
import SubcategoryInsights from './SubcategoryInsights';
export default class CategoryInsights implements ICategoryInsights {
    private _categoryId;
    private _amount;
    private _average?;
    private _quantity?;
    private _subcategories?;
    private _transactions?;
    constructor({ categoryId, amount, average, quantity, subcategories, transactions }: ICategoryInsights);
    get categoryId(): number;
    get amount(): number;
    get average(): number | undefined;
    get quantity(): number | undefined;
    get subcategories(): SubcategoryInsights[] | undefined;
    get transactions(): Transaction[] | undefined;
}
