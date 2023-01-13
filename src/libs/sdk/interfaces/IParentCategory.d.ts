import Category from '../models/Category';
import ICategory from './ICategory';
export default interface IParentCategory extends ICategory {
    subcategories: Category[];
}
