import React, { FC } from 'react';
import Budget from '../../../shared/models/Budget';
import Category from '../../../shared/models/Category';
import { BudgetModalAction } from '../types/BudgetModalAction';
interface IProps {
    modalDispatch: React.Dispatch<BudgetModalAction>;
    category: Category | null | undefined;
    budget: Budget | null;
    subBudgets: Budget[];
    categoriesText: string;
    subcategoriesText: string;
    categories: Category[];
    budgetCardMessage: string;
    editButtonText: string;
    deleteButtonText: string;
    showConfirmDeleteDialog: React.Dispatch<React.SetStateAction<boolean>>;
}
declare const SubudgetList: FC<IProps>;
export default SubudgetList;
