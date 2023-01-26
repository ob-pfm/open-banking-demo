import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { useOutletContext, useSearchParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { API_KEY } from '../../constants';
import { showErrorToast } from '../../helpers';
import { IOutletContext } from '../../interfaces';

import {
  AccountsClient,
  Account,
  CategoriesClient,
  Category,
  ParentCategory,
  TransactionsClient,
  Transaction,
  TransactionPayload,
  FilterOptions
} from '../../libs/sdk';
import { IListOptions } from '../../libs/sdk/interfaces';

import '../../libs/wc/ob-transactions-component';

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
  const { alertIsShown, alertText, userId } = useOutletContext<IOutletContext>();
  const [filterOptions, setFilterOptions] = useState<FilterOptions>(new FilterOptions());
  const accountServices = useMemo(
    () =>
      new AccountsClient(
        API_KEY,
        'https://cors-anywhere.herokuapp.com/http://tecbantest@ec2-3-21-18-54.us-east-2.compute.amazonaws.com:8081/api/v1/'
      ),
    []
  );
  const categoryServices = useMemo(
    () =>
      new CategoriesClient(
        API_KEY,
        'https://cors-anywhere.herokuapp.com/http://tecbantest@ec2-3-21-18-54.us-east-2.compute.amazonaws.com:8081/api/v1/'
      ),
    []
  );
  const transactionServices = useMemo(
    () =>
      new TransactionsClient(
        API_KEY,
        'https://cors-anywhere.herokuapp.com/http://tecbantest@ec2-3-21-18-54.us-east-2.compute.amazonaws.com:8081/api/v1/'
      ),
    []
  );

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
        const {
          withCharges,
          withDebits,
          categoryId,
          subcategoryId,
          dateFrom,
          dateTo,
          minAmount,
          maxAmount,
          accountId
        } = filters;
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
        transactionServices.getList(Number(accountId), parsedFilterOptions).then((response: Transaction[]) => {
          const filteredTransactions: Transaction[] = getFilteredTransactions(
            response,
            filters.categoryId,
            filters.subcategoryId
          );
          componentRef.current.transactionsData = filteredTransactions.map((transaction) => ({
            ...transaction.toObject(),
            accountId: Number(accountId)
          }));
          onSuccess(response);
        });
      }
    },
    [transactionServices, getFilteredTransactions]
  );

  const handleSaveTransaction = useCallback(
    (e: { detail: ISubmitEventData }) => {
      componentRef.current.showModalLoading = true;
      const { transaction, onSuccess } = e.detail;
      const newTransaction = new TransactionPayload({ ...transaction });
      transactionServices.create(newTransaction).then(() => {
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
    if (userId) {
      let accountId = searchParams.get('account_id');
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
          const accounts = response.map((account: Account) => account.toObject());
          componentRef.current.accountsData = accounts;
          if (!accountId) accountId = accounts[0].id.toString();
          return categoryServices.getListWithSubcategories(userId);
        })
        .then((response: ParentCategory[]) => {
          {
            /** componentRef.current.categoriesData = response.map((category) => ({
            ...category.toObject(),
            subcategories: category.subcategories.map((subcategory: any) => subcategory.toObject())
          })); */
          }
          const tempOptions: FilterOptions = new FilterOptions();
          if (accountId) {
            tempOptions.accountId = accountId;
          }
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
        .catch((error) => {
          showErrorToast(error);
        });
    }
  }, [filterTransactions, accountServices, categoryServices, searchParams, userId]);

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
    <ob-transactions-component
      ref={componentRef}
      alertType="warning"
      showAlert={alertIsShown}
      alertText={alertText}
      fontFamily="Lato"
      lang="pt"
      currencyLang="pt-BR"
      currencyType="BRL"
    />
  );
};

export default TransactionsComponent;
