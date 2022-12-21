import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { useOutletContext, useSearchParams } from 'react-router-dom';
import { toast } from 'react-toastify';

import {
  AccountsClient,
  Account,
  CategoriesClient,
  Category,
  ParentCategory,
  TransactionsClient,
  Transaction,
  TransactionPayload,
  FilterOptions,
  CONSENT_REQUESTED_STATUS,
  CONSENT_GRANTED_STATUS,
  CONSENT_DELETED_STATUS,
  AGGREGATION_STARTED_STATUS,
  AGGREGATION_COMPLETED_STATUS,
  PROCESS_FAILED_STATUS
} from '../../libs/sdk';
import { IListOptions } from '../../libs/sdk/interfaces';

import '../../libs/wc/ob-transactions-component';

const userId = 2230376;
const accountId = 2602081;
interface ISubmitEventData {
  transaction: {
    id?: string;
    accountId: number;
    date: number;
    charge: boolean;
    description: string;
    amount: number;
    categoryId: number;
  };
  onSuccess: () => void;
}
interface IDeleteEventData {
  transactionId: string;
  onSuccess: () => void;
}

const TransactionsComponent = () => {
  const componentRef = useRef<any>(null);
  const [searchParams] = useSearchParams();
  const { aggStatus } = useOutletContext<{ aggStatus: string | null }>();
  const [filterOptions, setFilterOptions] = useState<FilterOptions>(new FilterOptions());
  const accountServices = useMemo(() => new AccountsClient('XXXX-XXXX-XXXX', true), []);
  const categoryServices = useMemo(() => new CategoriesClient('XXXX-XXXX-XXXX', true), []);
  const transactionServices = useMemo(() => new TransactionsClient('XXXX-XXXX-XXXX', true), []);

  const getFilteredTransactions = useCallback(
    (transactions: Transaction[], categoryId?: string, subcategoryId?: string) => {
      if (categoryId && !subcategoryId) {
        const selectedCategory = componentRef.current.categoriesData.find(
          (category: ParentCategory) => category.id === parseInt(categoryId)
        );
        if (selectedCategory && selectedCategory.subcategories) {
          const subcategoryDictionary: { [key: string]: boolean } = selectedCategory.subcategories.reduce(
            (
              acc: {
                [key: string]: boolean;
              },
              subcategory: Category
            ) => ({ ...acc, [subcategory.id]: true }),
            {}
          );
          return transactions.filter((transaction) => subcategoryDictionary[transaction.categoryId]);
        }
      }
      return transactions;
    },
    []
  );

  const filterTransactions = useCallback(
    (filters: FilterOptions, onSuccess: (response: Transaction[]) => void) => {
      const parsedFilterOptions: IListOptions = {};
      if (filters) {
        const { withCharges, withDebits, categoryId, subcategoryId, dateFrom, dateTo, minAmount, maxAmount } = filters;
        if (minAmount) {
          parsedFilterOptions.minAmount = parseFloat(minAmount);
        }
        if (maxAmount) {
          parsedFilterOptions.maxAmount = parseInt(maxAmount);
        }
        if (dateFrom) {
          parsedFilterOptions.dateFrom = Math.floor(new Date(dateFrom).getTime());
        }
        if (dateTo) {
          parsedFilterOptions.dateTo = Math.floor(new Date(dateTo).getTime());
        }
        if (withCharges !== withDebits) {
          parsedFilterOptions.charge = withCharges === 'true';
        }
        if (categoryId) {
          if (subcategoryId) {
            parsedFilterOptions.categoryId = parseInt(subcategoryId);
          } else {
            parsedFilterOptions.categoryId = parseInt(categoryId);
          }
        }
      }
      transactionServices.getList(accountId, parsedFilterOptions).then((response: Transaction[]) => {
        const filteredTransactions: Transaction[] = getFilteredTransactions(
          response,
          filters.categoryId,
          filters.subcategoryId
        );
        componentRef.current.transactionsData = filteredTransactions.map((transaction) => ({
          ...transaction.getPlainObject(),
          accountId
        }));
        onSuccess(response);
      });
    },
    [transactionServices, getFilteredTransactions]
  );

  const handleSaveTransaction = useCallback(
    (e: { detail: ISubmitEventData }) => {
      componentRef.current.showModalLoading = true;
      const { transaction, onSuccess } = e.detail;
      const newTransaction = new TransactionPayload({ ...transaction });
      transactionServices.create(accountId, newTransaction).then(() => {
        filterTransactions(filterOptions, () => {
          onSuccess();
          toast.success('Nuevo Movimiento agregado.');
          componentRef.current.showModalLoading = false;
        });
      });
    },
    [transactionServices, filterOptions, filterTransactions]
  );

  const handleEditTransaction = useCallback(
    (e: { detail: ISubmitEventData }) => {
      componentRef.current.showModalLoading = true;
      const { transaction, onSuccess } = e.detail;
      const { id, ...rest } = transaction;
      const editedTransaction = new TransactionPayload({ ...rest });
      transactionServices.edit(id!, editedTransaction).then(() => {
        filterTransactions(filterOptions, () => {
          onSuccess();
          toast.success('Alterações salvas.');
          componentRef.current.showModalLoading = false;
        });
      });
    },
    [transactionServices, filterOptions, filterTransactions]
  );

  const handleDeleteTransaction = useCallback(
    (e: { detail: IDeleteEventData }) => {
      componentRef.current.showModalLoading = true;
      const { transactionId, onSuccess } = e.detail;
      transactionServices.delete(transactionId).then((response: boolean) => {
        filterTransactions(filterOptions, () => {
          onSuccess();
          toast.success('Conta apagada.');
          componentRef.current.showModalLoading = false;
        });
      });
    },
    [transactionServices, filterOptions, filterTransactions]
  );

  useEffect(() => {
    const subcategoryId = searchParams.get('subcategory_id');
    const categoryId = searchParams.get('category_id');
    const dateFrom = searchParams.get('date_from');
    const dateTo = searchParams.get('date_to');

    componentRef.current.showMainLoading = true;
    componentRef.current.transactionsData = [];
    componentRef.current.accountsData = [];
    componentRef.current.categoriesData = [];
    accountServices
      .getList(userId)
      .then((response: Account[]) => {
        componentRef.current.accountsData = response.map((account: Account) => account.getPlainObject());
        return categoryServices.getListWithSubcategories(userId);
      })
      .then((response: ParentCategory[]) => {
        componentRef.current.categoriesData = response.map((category) => ({
          ...category.getPlainObject(),
          subcategories: category.subcategories.map((subcategory) => subcategory.getPlainObject())
        }));
        const tempOptions: FilterOptions = new FilterOptions();
        if (categoryId) {
          tempOptions.categoryId = categoryId;
        }
        if (subcategoryId) {
          tempOptions.subcategoryId = subcategoryId;
        }
        if (dateFrom) {
          const date = new Date(parseInt(dateFrom));
          const [splittedDate] = date.toISOString().split('T');
          tempOptions.dateFrom = splittedDate;
        }
        if (dateTo) {
          const date = new Date(parseInt(dateTo));
          const [splittedDate] = date.toISOString().split('T');
          tempOptions.dateTo = splittedDate;
        }
        if (tempOptions) {
          componentRef.current.defaultFilterOptions = tempOptions;
          setFilterOptions(tempOptions);
        }
        filterTransactions(tempOptions, (transactionsRes: Transaction[]) => {
          if (!transactionsRes.length) {
            componentRef.current.isEmpty = true;
          }
          componentRef.current.showMainLoading = false;
        });
      })
      .catch(() => {
        // e.detail.showToast('error', 'Error de servidor');
      });
  }, [filterTransactions, accountServices, categoryServices, searchParams]);

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
    componentRefCurrent.addEventListener('save-new', handleSaveTransaction);
    componentRefCurrent.addEventListener('save-edit', handleEditTransaction);
    componentRefCurrent.addEventListener('delete', handleDeleteTransaction);

    return () => {
      componentRefCurrent.removeEventListener('save-new', handleSaveTransaction);
      componentRefCurrent.removeEventListener('save-edit', handleEditTransaction);
      componentRefCurrent.removeEventListener('delete', handleDeleteTransaction);
    };
  }, [handleSaveTransaction, handleEditTransaction, handleDeleteTransaction]);

  return (
    <ob-transactions-component ref={componentRef} fontFamily="Lato" lang="pt" currencyLang="pt-BR" currencyType="BRL" />
  );
};

export default TransactionsComponent;
