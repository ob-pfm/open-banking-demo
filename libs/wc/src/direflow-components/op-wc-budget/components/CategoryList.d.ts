import React, { FC } from 'react';
import Category from '../../../shared/models/Category';
import { BudgetModalAction } from '../types/BudgetModalAction';
interface IProps {
    categories: Category[];
    modalDispatch: React.Dispatch<BudgetModalAction>;
}
declare const CategoryList: FC<IProps>;
export default CategoryList;
