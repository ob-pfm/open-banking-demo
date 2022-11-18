import ICategory from '../../interfaces/insights/ICategory';
import Subcategory from './Subcategory';
export default class Category implements ICategory {
    categoryId: number;
    amount: number;
    subcategories: Subcategory[];
    name: string | undefined;
    color: string | undefined;
    userId: number | null;
    constructor(categoryId: number, amount: number, subcategories: Subcategory[], name: string | undefined, color: string | undefined, userId: number | null);
}
