import { IBudget } from '../../../shared/interfaces/IBudget';
import ICategory from '../../../shared/interfaces/ICategory';
import ISharedProperties from '../../../shared/interfaces/IProperties';
import ICommonProps from '../../../shared/interfaces/ICommonProps';
export interface IBudgetProps extends ISharedProperties, ICommonProps {
    budgetTitle: string | null;
    budgetTotalTitle: string | null;
    budgetModalFirstTitle: string | null;
    budgetModalSecondTitle: string;
    budgetModalDetailTitle: string | null;
    budgetData: IBudget[] | string;
    categoriesData: ICategory[] | string;
    formCategoriesText: string | null;
    formSubcategoriesText: string | null;
    warningPercentage: number;
    budgetCardMessage: string | null;
    formCreateButtonText: string | null;
    formSaveButtonText: string | null;
    editButtonText: string | null;
    deleteButtonText: string | null;
    confirmDeleteDialogTitle: string | null;
    confirmDeleteDialogMessage: string | null;
    confirmDeleteDialogNegativeButtonText: string | null;
    confirmDeleteDialogPositiveButtonText: string | null;
    isEmpty: boolean;
    emptyViewTitle: string | null;
    emptyViewDescription: string | null;
    emptyViewActionText: string | null;
}
