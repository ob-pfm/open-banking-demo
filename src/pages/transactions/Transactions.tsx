import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { useOutletContext, useSearchParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import {
  AccountsClient,
  CategoriesClient,
  TransactionsClient,
  Transaction,
  TransactionPayload,
  Account
} from 'open-banking-pfm-sdk';
import { IAccount, IListOptions, ITransaction } from 'open-banking-pfm-sdk/interfaces';
import { URL_SERVER } from '../../constants';
import { showErrorToast, unicodeToChar } from '../../helpers';
import { IOutletContext } from '../../interfaces';

import '../../libs/wc/ob-transactions-component';
import { ITransactionFilterEvent } from './interfaces';

interface TransactionsOptions {
  accounts: IAccount[];
  accountId: number;
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
    accountId: 0,
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
  const [transactionsFilteredData, setTransactionsFilteredData] = useState<ITransaction[]>([]);
  const [page, setPage] = useState(0);
  const accountServices = useMemo(() => new AccountsClient(apiKey, URL_SERVER), [apiKey]);
  const categoryServices = useMemo(() => new CategoriesClient(apiKey, URL_SERVER), [apiKey]);
  const transactionServices = useMemo(() => new TransactionsClient(apiKey, URL_SERVER), [apiKey]);

  const getFiltersFromObject = ({
    accounts,
    accountId,
    categoryId,
    subcategoryId,
    dateFrom,
    dateTo
  }: {
    accounts?: IAccount[] | null;
    accountId?: number | null;
    categoryId?: string | null;
    subcategoryId?: string | null;
    dateFrom?: string | null;
    dateTo?: string | null;
  }) => {
    const tempOptions: any = {};
    if (accounts) tempOptions.accounts = accounts;
    if (accountId) tempOptions.accountId = accountId;
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

  const filterTransactions = useCallback(
    (onSuccess: (response: Transaction[]) => void) => {
      const parsedFilterOptions: IListOptions = {};
      if (filterOptions) {
        const {
          accountId,
          withCharges,
          withDebits,
          categoryId,
          subcategoryId,
          dateFrom,
          dateTo,
          minAmount,
          maxAmount
        } = filterOptions;
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

        if (userId)
          transactionServices
            .getList(Number(accountId), { ...parsedFilterOptions, page, field: 'executionDate' })
            .then((response) => {
              onSuccess(response.data);
              componentRef.current.totalPages = response.totalPages;
              componentRef.current.showModalLoading = false;
            })
            .catch(() => {
              toast.error('Um erro ocorreu.');
              componentRef.current.showModalLoading = false;
            });
      }
    },
    [filterOptions, transactionServices, userId, page]
  );

  const handleClickPage = useCallback(
    (e: { detail: number }) => {
      if (filterOptions.accountId) {
        componentRef.current.showModalLoading = true;
        componentRef.current.activePage = Number(e.detail);
        setPage(e.detail - 1);
      }
    },
    [filterOptions.accountId]
  );

  const handleFilterText = useCallback((e: { detail: ITransactionFilterEvent }) => {
    const filter = e.detail.description.toLowerCase();
    setFilterText(filter);
  }, []);

  const handleFilter = useCallback(
    (e: { detail: ITransactionFilterEvent }) => {
      const {
        accountId: accountIdFilter,
        categoryId,
        subcategoryId,
        minAmount,
        maxAmount,
        withCharges,
        withDebits,
        dateFrom,
        dateTo
      } = e.detail;
      const accountIdStr = Number(accountIdFilter);
      let transactions = transactionsData;
      if (accountIdFilter !== '') transactions = transactions.filter((tr) => tr.accountId === accountIdStr);
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
            if (transactionsRes.length > 0) componentRef.current.isEmpty = false;
            else componentRef.current.isEmpty = true;
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
            if (transactionsRes.length > 0) componentRef.current.isEmpty = false;
            else componentRef.current.isEmpty = true;
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

  const handleChangeAccount = useCallback(
    (e: React.ChangeEvent<HTMLSelectElement>) => {
      componentRef.current.showModalLoading = true;
      componentRef.current.activePage = 1;
      setPage(0);
      setFilterOptions({ ...filterOptions, accountId: Number(e.target.value) });
    },
    [filterOptions, componentRef]
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
      const accountIdParam = searchParams.get('account_id');
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

          if (accountIdParam)
            setFilterOptions(
              getFiltersFromObject({
                accounts,
                accountId: Number(accountIdParam),
                categoryId,
                subcategoryId,
                dateFrom,
                dateTo
              })
            );
          else
            setFilterOptions(
              getFiltersFromObject({
                accounts,
                accountId: Number(accounts[0].id),
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
          componentRef.current.isEmpty = false;
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
    componentRefCurrent.addEventListener('click-page', handleClickPage);
    componentRefCurrent.addEventListener('click-prev-page', handleClickPage);
    componentRefCurrent.addEventListener('click-next-page', handleClickPage);
    componentRefCurrent.componentStyles = `
      .obwc-sidebar-modal__body form .obwc-filter-transactions-modal__row:first-child{
        display:none;
      }
    `;

    return () => {
      componentRefCurrent.removeEventListener('save-new', handleSaveTransaction);
      componentRefCurrent.removeEventListener('save-edit', handleEditTransaction);
      componentRefCurrent.removeEventListener('delete', handleDeleteTransaction);
      componentRefCurrent.addEventListener('filter-trigger', handleFilter);
      componentRefCurrent.addEventListener('filter-text-trigger', handleFilterText);
      componentRefCurrent.addEventListener('click-page', handleClickPage);
      componentRefCurrent.addEventListener('click-prev-page', handleClickPage);
      componentRefCurrent.addEventListener('click-next-page', handleClickPage);
    };
  }, [
    handleSaveTransaction,
    handleEditTransaction,
    handleDeleteTransaction,
    handleFilter,
    handleFilterText,
    handleClickPage
  ]);

  useEffect(() => {
    componentRef.current.transactionsData = transactionsFilteredData;
    componentRef.current.scrollIntoView();
  }, [transactionsFilteredData]);

  return (
    <>
      <div className="selectContainer">
        <select onChange={handleChangeAccount} value={filterOptions.accountId}>
          {filterOptions.accounts &&
            filterOptions.accounts.map((account) => (
              <option key={account.id} value={account.id}>
                {unicodeToChar(account.name)}
              </option>
            ))}
        </select>
      </div>
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
        activePage={1}
      />
    </>
  );
};

export default TransactionsComponent;
