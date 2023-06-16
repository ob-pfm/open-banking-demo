import { useCallback, useEffect, useMemo, useRef } from 'react';
import { useOutletContext } from 'react-router-dom';
import { toast } from 'react-toastify';

import { CategoriesClient, ParentCategory, BudgetsClient, Budget, BudgetPayload } from 'open-banking-pfm-sdk';
import { URL_SERVER as serverUrl, URL_ASSETS as assetsUrl } from '../../constants';

import { IOutletContext } from '../../interfaces';

import '../../libs/wc/ob-budget-component';

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
  const componentRef = useRef<any>(null); // Creating a ref to hold a reference to a DOM element
  // Destructuring values from a custom hook
  const { isProcessing, alertText, userId, apiKey } = useOutletContext<IOutletContext>();
  // Creating a memoized instance of a client class
  const budgetsServices = useMemo(() => new BudgetsClient({ apiKey, serverUrl }), [apiKey]);
  // Creating a memoized instance of another client class
  const categoryServices = useMemo(
    () => new CategoriesClient({ apiKey, serverUrl, assetsUrl: `${assetsUrl}/categories/` }),
    [apiKey]
  );

  const getBudgets = useCallback(
    (onSuccess: (response: boolean) => void, onError?: () => void) => {
      // Creating a callback function with memoized dependencies
      if (userId)
        budgetsServices // Calling a method from the client class
          .getList(userId)
          .then((response: Budget[]) => {
            if (response.length > 0) {
              // Modifying a DOM element's property
              componentRef.current.budgetData = response.map((budget) => budget.toObject());
              componentRef.current.isEmpty = false; // Modifying a DOM element's property
            } else componentRef.current.isEmpty = true; // Modifying a DOM element's property
            onSuccess(response.length === 0); // Calling a callback function
          })
          .catch(() => {
            onError && onError(); // Calling an optional callback function
          });
    },
    [budgetsServices, userId] // Dependencies for the callback function
  );

  // Define handleSaveBudget function
  const handleSaveBudget = useCallback(
    (e: { detail: ISubmitEventData }) => {
      componentRef.current.showModalLoading = true; // Show modal loading
      const budgetPromises = e.detail.budgets
        .filter(({ amount }) => amount > 0) // Filter budgets with amount > 0
        .map(
          ({ name, categoryId, amount }) =>
            new Promise((resolve, reject) => {
              // Check if userId is truthy
              if (userId)
                // Create budget using budgetsServices
                budgetsServices
                  .create(new BudgetPayload({ name, amount, warningPercentage: 0.5, categoryId, userId }))
                  .then(() => resolve(true)) // Resolve promise with true on success
                  .catch(() => reject()); // Reject promise on failure
            })
        );
      Promise.all(budgetPromises) // Wait for all budget promises to resolve
        .then(() => {
          getBudgets(() => {
            // Call getBudgets function with callback on success
            e.detail.onSuccess(); // Call onSuccess callback from event
            toast.success('Orçamento adicionado.'); // Show success toast
            componentRef.current.showModalLoading = false; // Hide modal loading
          });
        })
        .catch(() => {
          toast.error('Um erro ocorreu.'); // Show error toast
          componentRef.current.showModalLoading = false; // Hide modal loading
        });
    },
    [budgetsServices, getBudgets, userId] // Dependencies for useCallback hook
  );

  // Define handleEditBudget function
  const handleEditBudget = useCallback(
    (e: { detail: ISubmitEventData }) => {
      componentRef.current.showModalLoading = true; // Show modal loading
      const budgetPromises = e.detail.budgets
        .filter(({ id }) => id) // Filter budgets with id present
        .map(
          ({ id, name, amount }) =>
            new Promise((resolve, reject) => {
              if (userId)
                // Check if userId is truthy
                budgetsServices
                  .edit(id, { name, amount, warningPercentage: 0.5 }) // Edit budget using budgetsServices
                  .then(() => resolve(true)) // Resolve promise with true on success
                  .catch(() => reject()); // Reject promise on failure
            })
        );
      const newBudgetPromises = e.detail.budgets
        .filter(({ id, amount }) => id === undefined && amount !== 0) // Filter budgets with id present
        .map(
          ({ name, categoryId, amount }) =>
            new Promise((resolve, reject) => {
              // Check if userId is truthy
              if (userId)
                // Create budget using budgetsServices
                budgetsServices
                  .create(new BudgetPayload({ name, amount, warningPercentage: 0.5, categoryId, userId }))
                  .then(() => resolve(true)) // Resolve promise with true on success
                  .catch(() => reject()); // Reject promise on failure
            })
        );
      Promise.all([...budgetPromises, ...newBudgetPromises]) // Wait for all budget promises to resolve
        .then(() => {
          getBudgets(() => {
            // Call getBudgets function with callback on success
            e.detail.onSuccess(); // Call onSuccess callback from event
            toast.success('Orçamento atualizado.'); // Show success toast
            componentRef.current.showModalLoading = false; // Hide modal loading
          });
        })
        .catch(() => {
          toast.error('Um erro ocorreu.'); // Show error toast
          componentRef.current.showModalLoading = false; // Hide modal loading
        });
    },
    [budgetsServices, getBudgets, userId] // Dependencies for useCallback hook
  );

  // Define handleDeleteBudget function
  const handleDeleteBudget = useCallback(
    (e: { detail: IDeleteEventData }) => {
      componentRef.current.showModalLoading = true; // Show modal loading
      const deletePromisesArray = e.detail.budget.subBudgets.map(
        (budget: ISubBudget) =>
          new Promise((resolve, reject) => {
            budgetsServices
              .delete(budget.id) // Delete budget using budgetsServices
              .then(() => {
                resolve(true); // Resolve promise with true on success
              })
              .catch(() => {
                reject(); // Reject promise on failure
              });
          })
      );
      Promise.all(deletePromisesArray) // Wait for all delete promises to resolve
        .then(() => {
          getBudgets(() => {
            // Call getBudgets function with callback on success
            e.detail.onSuccess(); // Call onSuccess callback from event
            toast.success('Orçamentos excluídos.'); // Show success toast
            componentRef.current.showModalLoading = false; // Hide modal loading
          });
        })
        .catch(() => {
          toast.error('Um erro ocorreu.'); // Show error toast
          componentRef.current.showModalLoading = false; // Hide modal loading
        });
    },
    [budgetsServices, getBudgets] // Dependencies for useCallback hook
  );

  // First useEffect hook
  useEffect(() => {
    componentRef.current.showMainLoading = true; // Show main loading
    componentRef.current.budgetData = []; // Clear budgetData
    componentRef.current.categoriesData = []; // Clear categoriesData
    if (userId)
      // Check if userId is truthy
      categoryServices
        .getListWithSubcategories(userId) // Fetch categories with subcategories using categoryServices
        .then((response: ParentCategory[]) => {
          componentRef.current.categoriesData = response;
          getBudgets((isEmpty: boolean) => {
            // Call getBudgets function with callback on success
            if (isEmpty) componentRef.current.isEmpty = true; // Set isEmpty flag to true
            componentRef.current.showMainLoading = false; // Hide main loading
          });
        })
        .catch(() => {
          toast.error('Um erro ocorreu.'); // Show error toast
        });
  }, [getBudgets, categoryServices, userId]); // Dependencies for useEffect hook

  // Second useEffect hook
  useEffect(() => {
    const componentRefCurrent = componentRef.current; // Capture current value of componentRef
    componentRefCurrent.addEventListener('save-new', handleSaveBudget); // Add event listener for 'save-new' event
    componentRefCurrent.addEventListener('save-edit', handleEditBudget); // Add event listener for 'save-edit' event
    componentRefCurrent.addEventListener('delete', handleDeleteBudget); // Add event listener for 'delete' event

    return () => {
      componentRefCurrent.removeEventListener('save-new', handleSaveBudget); // Remove event listener for 'save-new' event
      componentRefCurrent.removeEventListener('save-edit', handleEditBudget); // Remove event listener for 'save-edit' event
      componentRefCurrent.removeEventListener('delete', handleDeleteBudget); // Remove event listener for 'delete' event
    };
  }, [handleSaveBudget, handleDeleteBudget, handleEditBudget]); // Dependencies for useEffect hook

  return (
    <ob-budget-component
      alertType="warning" // Set the type of alert to "warning"
      showAlert={isProcessing} // Show the alert when the value of isProcessing is truthy, hide it otherwise
      alertText={alertText} // Set the text for the alert
      ref={componentRef} // Attach a ref to the component using componentRef
      fontFamily="Lato" // Set the font family to "Lato"
    />
  );
};

export default BudgetsComponent;
