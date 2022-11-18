import React, { FC } from 'react';
import Budget from '../../../shared/models/Budget';
import { Category } from '../../../shared/models';
import { BudgetModalAction } from '../types/BudgetModalAction';
interface IProps {
    modalDispatch?: React.Dispatch<BudgetModalAction>;
    budget?: Budget;
    amount: number;
    name: string;
    spentAmount: number;
    budgetCardMessage: string;
    categoryId?: number;
    userCategory?: Category | undefined;
    warningPercent?: number;
    isSubudget?: boolean;
}
declare const BudgetCard: FC<IProps>;
export default BudgetCard;
