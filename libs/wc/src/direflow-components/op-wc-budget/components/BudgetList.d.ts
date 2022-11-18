import React, { FC } from 'react';
import Category from '../../../shared/models/Category';
import BudgetTotal from '../../../shared/models/BudgetTotal';
import { BudgetModalAction } from '../types/BudgetModalAction';
interface IProps {
    modalDispatch: React.Dispatch<BudgetModalAction>;
    budget: BudgetTotal | null;
    categories: Category[];
    budgetTotalTitle: string;
    warningPercentage: number;
    budgetCardMessage: string;
}
declare const BudgetList: FC<IProps>;
export default BudgetList;
