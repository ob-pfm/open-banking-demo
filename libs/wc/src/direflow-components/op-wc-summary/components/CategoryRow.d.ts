import { Dispatch, FC } from 'react';
import Subcategory from '../../../shared/models/insights/Subcategory';
import { InExAction } from '../types/InExAction';
interface IProps {
    index: number;
    prefixClass: string;
    categoryId: string | undefined;
    name: string | undefined;
    amount: string;
    percent: string;
    color: string;
    isSubcategory: boolean;
    dispatchState: Dispatch<InExAction>;
    type: string;
    subcategories: Subcategory[];
    userId: number | null;
    date: number | Date;
    parentCategoryId: number | null;
}
declare const CategoryRow: FC<IProps>;
export default CategoryRow;
