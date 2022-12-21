import { useCallback, useEffect, useMemo, useRef } from 'react';
import { useOutletContext } from 'react-router-dom';
import { toast } from 'react-toastify';

import {
  CategoriesClient,
  ParentCategory,
  BudgetsClient,
  Budget,
  BudgetPayload,
  CONSENT_REQUESTED_STATUS,
  CONSENT_GRANTED_STATUS,
  CONSENT_DELETED_STATUS,
  AGGREGATION_STARTED_STATUS,
  AGGREGATION_COMPLETED_STATUS,
  PROCESS_FAILED_STATUS
} from '../../libs/sdk';

import '../../libs/wc/ob-budget-component';

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
  const { aggStatus } = useOutletContext<{ aggStatus: string | null }>();
  const budgetsServices = useMemo(() => new BudgetsClient('XXXX-XXXX-XXXX', true), []);
  const categoryServices = useMemo(() => new CategoriesClient('XXXX-XXXX-XXXX', true), []);

  const getBudgets = useCallback(
    (onSuccess: (response: boolean) => void, onError?: () => void) => {
      budgetsServices
        .getList(userId)
        .then((response: Budget[]) => {
          componentRef.current.budgetData = response.map((budget) => budget.getPlainObject());
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
          ...category.getPlainObject(),
          subcategories: category.subcategories.map((subcategory) => subcategory.getPlainObject())
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
    switch (aggStatus) {
      case CONSENT_REQUESTED_STATUS:
        toast.info('Consentimento solicitado.');
        break;
      case CONSENT_GRANTED_STATUS:
        toast.success('Consentimento concedido.');
        break;
      case CONSENT_DELETED_STATUS:
        toast.warn('Consentimento removido.');
        break;
      case AGGREGATION_STARTED_STATUS:
        componentRef.current.alertType = 'warning';
        componentRef.current.alertText = 'Agregação de banco em processo...';
        componentRef.current.showAlert = true;
        break;
      case AGGREGATION_COMPLETED_STATUS:
        if (componentRef.current.showAlert) {
          componentRef.current.showAlert = false;
        }
        toast.success('Agregação de banco finalizada.');
        break;
      case PROCESS_FAILED_STATUS:
        if (componentRef.current.showAlert) {
          componentRef.current.showAlert = false;
        }
        toast.error('Consentimento removido.');
        break;
      default:
        break;
    }
  }, [aggStatus]);

  useEffect(() => {
    const componentRefCurrent = componentRef.current;
    componentRefCurrent.addEventListener('save-new', handleSaveBudget);
    componentRefCurrent.addEventListener('delete', handleDeleteBudget);

    return () => {
      componentRefCurrent.removeEventListener('save-new', handleSaveBudget);
      componentRefCurrent.removeEventListener('delete', handleDeleteBudget);
    };
  }, [handleSaveBudget, handleDeleteBudget]);

  return <ob-budget-component ref={componentRef} fontFamily="Lato" lang="pt" currencyLang="pt-BR" currencyType="BRL" />;
};

export default BudgetsComponent;
