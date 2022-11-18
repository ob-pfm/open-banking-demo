import React, { FC } from 'react';
import Category from '../../../shared/models/Category';
import { BudgetModalAction } from '../types/BudgetModalAction';
interface IProps {
    category: Category;
    modalDispatch: React.Dispatch<BudgetModalAction>;
}
declare const CategoryCard: FC<IProps>;
export default CategoryCard;
