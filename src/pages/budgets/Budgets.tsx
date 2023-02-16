import { useCallback, useEffect, useMemo, useRef } from 'react';
import { useOutletContext } from 'react-router-dom';
import { toast } from 'react-toastify';

import { CategoriesClient, ParentCategory, BudgetsClient, Budget, BudgetPayload } from 'open-banking-pfm-sdk';

import '../../libs/wc/ob-budget-component';
import { IOutletContext } from '../../interfaces';

interface IBudgetData {
  id: number;
  amount: number;
  categoryId: number;
  name: string;
}

interface ISubBudget {
  id: string;
}
interface ISubmitEventData {
  budgets: IBudgetData[];
  onSuccess: () => void;
}
interface IDeleteEventData {
  budget: { subBudgets: ISubBudget[] };
  onSuccess: () => void;
}

const BudgetsComponent = () => {
  const componentRef = useRef<any>(null);
  const { isProcessing, alertText, userId } = useOutletContext<IOutletContext>();
  const budgetsServices = useMemo(
    () => new BudgetsClient(localStorage.getItem('API_KEY') || '', localStorage.getItem('SERVER_URL') || ''),
    []
  );
  const categoryServices = useMemo(
    () => new CategoriesClient(localStorage.getItem('API_KEY') || '', localStorage.getItem('SERVER_URL') || ''),
    []
  );

  const getBudgets = useCallback(
    (onSuccess: (response: boolean) => void, onError?: () => void) => {
      if (userId)
        budgetsServices
          .getList(userId)
          .then((response: Budget[]) => {
            if (response.length > 0) {
              componentRef.current.budgetData = response.map((budget) => budget.toObject());
              componentRef.current.isEmpty = false;
            } else componentRef.current.isEmpty = true;
            onSuccess(response.length === 0);
          })
          .catch(() => {
            onError && onError();
          });
    },
    [budgetsServices, userId]
  );

  const handleSaveBudget = useCallback(
    (e: { detail: ISubmitEventData }) => {
      componentRef.current.showModalLoading = true;
      const budgetPromises = e.detail.budgets
        .filter(({ amount }) => amount > 0)
        .map(
          ({ name, categoryId, amount }) =>
            new Promise((resolve, reject) => {
              if (userId)
                budgetsServices
                  .create(new BudgetPayload({ name, amount, warningPercentage: 0.5, categoryId, userId }))
                  .then(() => resolve(true))
                  .catch(() => reject());
            })
        );
      Promise.all(budgetPromises)
        .then(() => {
          getBudgets(() => {
            e.detail.onSuccess();
            toast.success('Orçamento adicionado.');
            componentRef.current.showModalLoading = false;
          });
        })
        .catch(() => {
          toast.error('Um erro ocorreu.');
          componentRef.current.showModalLoading = false;
        });
    },
    [budgetsServices, getBudgets, userId]
  );

  const handleEditBudget = useCallback(
    (e: { detail: ISubmitEventData }) => {
      componentRef.current.showModalLoading = true;
      const budgetPromises = e.detail.budgets
        .filter(({ id }) => id)
        .map(
          ({ id, name, amount }) =>
            new Promise((resolve, reject) => {
              if (userId)
                budgetsServices
                  .edit(id, { name, amount, warningPercentage: 0.5 })
                  .then(() => resolve(true))
                  .catch(() => reject());
            })
        );
      Promise.all(budgetPromises)
        .then(() => {
          getBudgets(() => {
            e.detail.onSuccess();
            toast.success('Orçamento atualizado.');
            componentRef.current.showModalLoading = false;
          });
        })
        .catch(() => {
          toast.error('Um erro ocorreu.');
          componentRef.current.showModalLoading = false;
        });
    },
    [budgetsServices, getBudgets, userId]
  );

  const handleDeleteBudget = useCallback(
    (e: { detail: IDeleteEventData }) => {
      componentRef.current.showModalLoading = true;
      const deletePromisesArray = e.detail.budget.subBudgets.map(
        (budget: ISubBudget) =>
          new Promise((resolve, reject) => {
            budgetsServices
              .delete(budget.id)
              .then(() => {
                resolve(true);
              })
              .catch(() => {
                reject();
              });
          })
      );
      Promise.all(deletePromisesArray)
        .then(() => {
          getBudgets(() => {
            e.detail.onSuccess();
            toast.success('Orçamentos excluídos.');
            componentRef.current.showModalLoading = false;
          });
        })
        .catch(() => {
          toast.error('Um erro ocorreu.');
          componentRef.current.showModalLoading = false;
        });
    },
    [budgetsServices, getBudgets]
  );

  useEffect(() => {
    componentRef.current.showMainLoading = true;
    componentRef.current.budgetData = [];
    componentRef.current.categoriesData = [];
    if (userId)
      categoryServices
        .getListWithSubcategories(userId)
        .then((response: ParentCategory[]) => {
          componentRef.current.categoriesData = response.map((category) => ({
            ...category.toObject(),
            subcategories: category.subcategories.map((subcategory) => subcategory.toObject())
          }));
          getBudgets((isEmpty: boolean) => {
            if (isEmpty) {
              componentRef.current.isEmpty = true;
            }
            componentRef.current.showMainLoading = false;
          });
        })
        .catch(() => {
          // e.detail.showToast('error', 'Error de servidor');
        });
  }, [getBudgets, categoryServices, userId]);

  useEffect(() => {
    const componentRefCurrent = componentRef.current;
    componentRefCurrent.addEventListener('save-new', handleSaveBudget);
    componentRefCurrent.addEventListener('save-edit', handleEditBudget);
    componentRefCurrent.addEventListener('delete', handleDeleteBudget);

    return () => {
      componentRefCurrent.removeEventListener('save-new', handleSaveBudget);
      componentRefCurrent.removeEventListener('save-edit', handleEditBudget);
      componentRefCurrent.removeEventListener('delete', handleDeleteBudget);
    };
  }, [handleSaveBudget, handleDeleteBudget, handleEditBudget]);

  return (
    <ob-budget-component
      alertType="warning"
      showAlert={isProcessing}
      alertText={alertText}
      ref={componentRef}
      fontFamily="Lato"
      lang="pt"
      currencyLang="pt-BR"
      currencyType="BRL"
    />
  );
};

export default BudgetsComponent;
