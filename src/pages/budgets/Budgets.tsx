import { useCallback, useEffect, useMemo, useRef } from 'react';
import { useOutletContext } from 'react-router-dom';
import { toast } from 'react-toastify';

import { CategoriesClient, ParentCategory, BudgetsClient, Budget, BudgetPayload } from 'open-banking-pfm-sdk';
import { API_KEY, SERVER_URL } from '../../constants';

const userId = 2230376;
interface IBudgetData {
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
  const { alertIsShown, alertText } = useOutletContext<{ alertIsShown: boolean; alertText: string }>();
  const budgetsServices = useMemo(() => new BudgetsClient(API_KEY, SERVER_URL), []);
  const categoryServices = useMemo(() => new CategoriesClient(API_KEY, SERVER_URL), []);

  const getBudgets = useCallback(
    (onSuccess: (response: boolean) => void, onError?: () => void) => {
      budgetsServices
        .getList(userId)
        .then((response: Budget[]) => {
          componentRef.current.budgetData = response.map((budget) => budget.toObject());
          onSuccess(response.length === 0);
        })
        .catch(() => {
          onError && onError();
        });
    },
    [budgetsServices]
  );

  const handleSaveBudget = useCallback(
    (e: { detail: ISubmitEventData }) => {
      componentRef.current.showModalLoading = true;
      const budgetPromises = e.detail.budgets
        .filter(({ amount }) => amount > 0)
        .map(
          ({ name, categoryId, amount }) =>
            new Promise((resolve, reject) => {
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
            toast.success('Presupuesto agregado.');
            componentRef.current.showModalLoading = false;
          });
        })
        .catch(() => {
          toast.error('Error al guardar.');
          componentRef.current.showModalLoading = false;
        });
    },
    [budgetsServices, getBudgets]
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
            toast.success('Presupuestos eliminados.');
            componentRef.current.showModalLoading = false;
          });
        })
        .catch(() => {
          toast.error('Error al eliminar.');
          componentRef.current.showModalLoading = false;
        });
    },
    [budgetsServices, getBudgets]
  );

  useEffect(() => {
    componentRef.current.showMainLoading = true;
    componentRef.current.budgetData = [];
    componentRef.current.categoriesData = [];
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
  }, [getBudgets, categoryServices]);

  useEffect(() => {
    const componentRefCurrent = componentRef.current;
    componentRefCurrent.addEventListener('save-new', handleSaveBudget);
    componentRefCurrent.addEventListener('delete', handleDeleteBudget);

    return () => {
      componentRefCurrent.removeEventListener('save-new', handleSaveBudget);
      componentRefCurrent.removeEventListener('delete', handleDeleteBudget);
    };
  }, [handleSaveBudget, handleDeleteBudget]);

  return (
    <ob-budget-component
      alertType="warning"
      showAlert={alertIsShown}
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
