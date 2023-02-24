import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { useOutletContext, useSearchParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import {
  AccountsClient,
  CategoriesClient,
  Category,
  ParentCategory,
  TransactionsClient,
  Transaction,
  TransactionPayload,
  Account
} from 'open-banking-pfm-sdk';
import { IAccount, IListOptions, ITransaction } from 'open-banking-pfm-sdk/interfaces';
import { URL_SERVER } from '../../constants';
import { showErrorToast } from '../../helpers';
import { IOutletContext } from '../../interfaces';

import '../../libs/wc/ob-transactions-component';
import { ITransactionFilterEvent } from './interfaces';

interface TransactionsOptions {
  accounts: string[];
  minAmount: string;
  maxAmount: string;
  categoryId: string;
  subcategoryId: string;
  withCharges: string;
  withDebits: string;
  dateFrom: string;
  dateTo: string;
}

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
  const { isProcessing, alertText, userId, apiKey } = useOutletContext<IOutletContext>();
  const [filterOptions, setFilterOptions] = useState<TransactionsOptions>({
    accounts: [],
    minAmount: '',
    maxAmount: '',
    categoryId: '',
    subcategoryId: '',
    withCharges: '',
    withDebits: '',
    dateFrom: '',
    dateTo: ''
  });
  const [filterText, setFilterText] = useState<string>('');
  const [transactionsData, setTransactionsData] = useState<ITransaction[]>([]);
  const [cursors, setCursors] = useState<Map<string, number>>(new Map());
  const [transactionsFilteredData, setTransactionsFilteredData] = useState<ITransaction[]>([]);
  const accountServices = useMemo(() => new AccountsClient(apiKey, URL_SERVER), [apiKey]);
  const categoryServices = useMemo(() => new CategoriesClient(apiKey, URL_SERVER), [apiKey]);
  const transactionServices = useMemo(() => new TransactionsClient(apiKey, URL_SERVER), [apiKey]);

  const getFiltersFromObject = ({
    accounts,
    categoryId,
    subcategoryId,
    dateFrom,
    dateTo
  }: {
    accounts?: string[] | null;
    categoryId?: string | null;
    subcategoryId?: string | null;
    dateFrom?: string | null;
    dateTo?: string | null;
  }) => {
    const tempOptions: any = {};
    if (accounts) tempOptions.accounts = accounts;
    if (categoryId) tempOptions.categoryId = categoryId;
    if (subcategoryId) tempOptions.subcategoryId = subcategoryId;
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
    componentRef.current.defaultFilterOptions = tempOptions;
    return tempOptions;
  };

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
  const loadMore = useCallback(() => {
    const transPromises: Promise<Transaction[]>[] = [];
    for (const [key, value] of cursors) {
      if (value !== 0) {
        transPromises.push(
          new Promise((resolve, reject) => {
            transactionServices
              .getList(Number(key), { cursor: value })
              .then((response) => {
                setCursors(cursors?.set(key, response.nextCursor));
                resolve(response.data);
              })
              .catch(() => reject());
          })
        );
      }
    }
    Promise.all(transPromises)
      .then((response) => {
        const transactions: Transaction[] = [];
        response.forEach((trArray) => transactions.push(...trArray));
        setTransactionsData([...transactionsData, ...transactions]);
        componentRef.current.showModalLoading = false;
      })
      .catch(() => {
        toast.error('Um erro ocorreu.');
        componentRef.current.showModalLoading = false;
      });
  }, [cursors, transactionServices, transactionsData, setCursors]);

  const filterTransactions = useCallback(
    (onSuccess: (response: Transaction[]) => void) => {
      const parsedFilterOptions: IListOptions = {};
      if (filterOptions) {
        const { accounts, withCharges, withDebits, categoryId, subcategoryId, dateFrom, dateTo, minAmount, maxAmount } =
          filterOptions;
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
        const transPromises: Promise<Transaction[]>[] = accounts.map(
          (accountId: string) =>
            new Promise((resolve, reject) => {
              if (userId)
                transactionServices
                  .getList(Number(accountId), parsedFilterOptions)
                  .then((response) => {
                    const filteredTransactions: Transaction[] = getFilteredTransactions(response.data);
                    setCursors(cursors?.set(accountId, response.nextCursor));
                    resolve(filteredTransactions);
                  })
                  .catch(() => reject());
            })
        );
        Promise.all(transPromises)
          .then((response) => {
            const transactions: Transaction[] = [];
            response.forEach((trArray) => transactions.push(...trArray));
            onSuccess(transactions);
            componentRef.current.showModalLoading = false;
          })
          .catch(() => {
            toast.error('Um erro ocorreu.');
            componentRef.current.showModalLoading = false;
          });
      }
    },
    [filterOptions, transactionServices, getFilteredTransactions, userId, setCursors, cursors]
  );
  const handleSaveTransaction = useCallback(
    (e: { detail: ISubmitEventData }) => {
      componentRef.current.showModalLoading = true;
      const { transaction, onSuccess } = e.detail;
      const newTransaction = new TransactionPayload({ ...transaction });
      transactionServices
        .create(newTransaction)
        .then(() => {
          filterTransactions((transactionsRes: Transaction[]) => {
            setTransactionsData(transactionsRes);
            setTransactionsFilteredData(transactionsRes);
            onSuccess();
            toast.success('Nuevo Movimiento agregado.');
            componentRef.current.showModalLoading = false;
          });
        })
        .catch(() => {
          toast.error('Um erro ocorreu.');
          componentRef.current.showModalLoading = false;
        });
    },
    [transactionServices, filterTransactions]
  );
  const handleFilterText = useCallback((e: { detail: ITransactionFilterEvent }) => {
    const filter = e.detail.description.toLowerCase();
    setFilterText(filter);
  }, []);
  const handleFilter = useCallback(
    (e: { detail: ITransactionFilterEvent }) => {
      const { accountId, categoryId, subcategoryId, minAmount, maxAmount, withCharges, withDebits, dateFrom, dateTo } =
        e.detail;
      const accountIdStr = Number(accountId);
      let transactions = transactionsData;
      if (accountId !== '') transactions = transactions.filter((tr) => tr.accountId === accountIdStr);
      if (subcategoryId !== '') {
        const subCatId = Number(subcategoryId);
        transactions = transactions.filter((tr) => tr.categoryId === subCatId);
      } else if (categoryId !== '') {
        const catId = Number(categoryId);
        transactions = transactions.filter((tr) => tr.categoryId === catId);
      }
      if (minAmount && minAmount !== '') {
        const min = Number(minAmount);
        transactions = transactions.filter((tr) => tr.amount >= min);
      }
      if (maxAmount && maxAmount !== '') {
        const max = Number(maxAmount);
        transactions = transactions.filter((tr) => tr.amount <= max);
      }
      if (dateFrom !== '') {
        const from = new Date(dateFrom).getTime();
        transactions = transactions.filter((tr) => tr.date >= from);
      }
      if (dateTo !== '') {
        const to = new Date(dateTo).getTime();
        transactions = transactions.filter((tr) => tr.date <= to);
      }
      if (withCharges === 'false') transactions = transactions.filter((tr) => !tr.charge);
      else if (withDebits === 'false') transactions = transactions.filter((tr) => tr.charge);
      setTransactionsFilteredData(transactions);
    },
    [transactionsData]
  );
  const handleEditTransaction = useCallback(
    (e: { detail: ISubmitEventData }) => {
      componentRef.current.showModalLoading = true;
      const { transaction, onSuccess } = e.detail;
      const { id, ...rest } = transaction;
      const editedTransaction = new TransactionPayload({ ...rest });
      transactionServices
        .edit(id!, editedTransaction)
        .then(() => {
          filterTransactions((transactionsRes: Transaction[]) => {
            setTransactionsData(transactionsRes);
            setTransactionsFilteredData(transactionsRes);
            onSuccess();
            toast.success('Alterações salvas.');
            componentRef.current.showModalLoading = false;
          });
        })
        .catch(() => {
          toast.error('Um erro ocorreu.');
          componentRef.current.showModalLoading = false;
        });
    },
    [transactionServices, filterTransactions]
  );
  const handleDeleteTransaction = useCallback(
    (e: { detail: IDeleteEventData }) => {
      componentRef.current.showModalLoading = true;
      const { transactionId, onSuccess } = e.detail;
      transactionServices
        .delete(transactionId)
        .then(() => {
          filterTransactions((transactionsRes: Transaction[]) => {
            setTransactionsData(transactionsRes);
            setTransactionsFilteredData(transactionsRes);
            onSuccess();
            toast.success('Movimiento apagado.');
            componentRef.current.showModalLoading = false;
          });
        })
        .catch(() => {
          toast.error('Um erro ocorreu.');
          componentRef.current.showModalLoading = false;
        });
    },
    [transactionServices, filterTransactions]
  );

  useEffect(() => {
    setTransactionsFilteredData(
      transactionsData.filter((tr) => tr.description.toLowerCase().indexOf(filterText) !== -1)
    );
  }, [filterText, transactionsData]);

  useEffect(() => {
    if (userId) {
      categoryServices.getListWithSubcategories(userId).then((response) => {
        componentRef.current.categoriesData = response.map((category) => ({
          ...category.toObject(),
          subcategories: category.subcategories.map((subcategory: any) => subcategory.toObject())
        }));
      });
    }
  }, [categoryServices, userId]);

  useEffect(() => {
    if (userId) {
      const accountId = searchParams.get('account_id');
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
          const accounts = response.map((acc: Account) => acc.toObject());
          componentRef.current.accountsData = accounts;
          if (!accountId)
            setFilterOptions(
              getFiltersFromObject({
                accounts: accounts.map((acc: IAccount) => acc.id.toString()),
                categoryId,
                subcategoryId,
                dateFrom,
                dateTo
              })
            );
          else
            setFilterOptions(
              getFiltersFromObject({
                accounts: [accountId],
                categoryId,
                subcategoryId,
                dateFrom,
                dateTo
              })
            );
        })
        .catch((error) => {
          showErrorToast(error);
        });
    }
  }, [accountServices, searchParams, userId]);
  useEffect(() => {
    if (filterOptions.accounts.length > 0) {
      filterTransactions((transactionsRes: Transaction[]) => {
        if (transactionsRes.length) {
          setTransactionsData(transactionsRes);
          setTransactionsFilteredData(transactionsRes);
        } else {
          componentRef.current.isEmpty = true;
        }
        componentRef.current.showMainLoading = false;
      });
    }
  }, [filterOptions.accounts, filterTransactions, filterOptions]);

  useEffect(() => {
    const componentRefCurrent = componentRef.current;
    componentRefCurrent.addEventListener('save-new', handleSaveTransaction);
    componentRefCurrent.addEventListener('save-edit', handleEditTransaction);
    componentRefCurrent.addEventListener('delete', handleDeleteTransaction);
    componentRefCurrent.addEventListener('filter-trigger', handleFilter);
    componentRefCurrent.addEventListener('filter-text-trigger', handleFilterText);

    return () => {
      componentRefCurrent.removeEventListener('save-new', handleSaveTransaction);
      componentRefCurrent.removeEventListener('save-edit', handleEditTransaction);
      componentRefCurrent.removeEventListener('delete', handleDeleteTransaction);
      componentRefCurrent.addEventListener('filter-trigger', handleFilter);
      componentRefCurrent.addEventListener('filter-text-trigger', handleFilterText);
    };
  }, [handleSaveTransaction, handleEditTransaction, handleDeleteTransaction, handleFilter, handleFilterText]);
  useEffect(() => {
    componentRef.current.transactionsData = transactionsFilteredData;
  }, [transactionsFilteredData]);

  return (
    <>
      <ob-transactions-component
        ref={componentRef}
        alertType="warning"
        showAlert={isProcessing}
        alertText={alertText}
        fontFamily="Lato"
        lang="pt"
        currencyLang="pt-BR"
        currencyType="BRL"
        searchDebounceTime={500}
      />
      {Array.from(cursors.values()).filter((value) => value !== 0).length > 0 && (
        <button onClick={() => loadMore()} type="button">
          Mais
        </button>
      )}
    </>
  );
};

export default TransactionsComponent;
