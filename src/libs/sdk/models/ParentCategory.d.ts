import Category from './Category';
import { ICategory, IParentCategory } from '../interfaces';
export default class ParentCategory extends Category {
    private _subcategories;
    constructor({ id, name, color, imagePath, parentCategoryId, userId, dateCreated, lastUpdated }: ICategory, subcategories?: Category[]);
    get subcategories(): Category[];
    set subcategories(subcategories: Category[]);
    toObject(): IParentCategory;
}
