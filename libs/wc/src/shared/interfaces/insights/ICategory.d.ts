import ITransaction from '../ITransaction';
import ISubcategory from './ISubcategory';
export default interface ICategory {
    categoryId: number;
    amount: number;
    subcategories: ISubcategory[];
    transactions?: ITransaction[] | null;
}
