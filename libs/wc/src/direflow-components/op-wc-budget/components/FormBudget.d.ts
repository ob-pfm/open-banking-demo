import { FC } from 'react';
import Category from '../../../shared/models/Category';
import Budget from '../../../shared/models/Budget';
import { ToastTrigger } from '../../../shared/types';
interface IProps {
    category: Category | undefined;
    subBudgets: Budget[];
    amount: number;
    handleCloseModal: () => void;
    edit: boolean;
    categoriesText: string;
    subcategoriesText: string;
    name: string;
    saveButtonText: string;
    createButtonText: string;
    showToast: ToastTrigger;
}
declare const FormBudget: FC<IProps>;
export default FormBudget;
