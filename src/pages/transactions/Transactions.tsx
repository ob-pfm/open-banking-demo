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
import { URL_SERVER as serverUrl, URL_ASSETS as assetsUrl } from '../../constants';
import { showErrorToast, unicodeToChar } from '../../helpers';
import { IOutletContext } from '../../interfaces';

import { ITransactionFilterEvent } from './interfaces';

import '../../libs/wc/ob-transactions-component';

// Define interface for filter options
interface TransactionsOptions {
  accounts: IAccount[];
  accountId: string;
  minAmount: string;
  maxAmount: string;
  categoryId: string;
  subcategoryId: string;
  withCharges: string;
  withDebits: string;
  dateFrom: string;
  dateTo: string;
}

// Define interface for submit event data
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

// Define interface for delete event data
interface IDeleteEventData {
  transactionId: string;
  onSuccess: () => void;
}

// Define the main component
const TransactionsComponent = () => {
  const componentRef = useRef<any>(null); // Reference to the component DOM node

  const [searchParams] = useSearchParams(); // Get search parameters from the URL
  // Get context values from OutletContext
  const { isProcessing, alertText, userId, apiKey } = useOutletContext<IOutletContext>();
  const [filterOptions, setFilterOptions] = useState<TransactionsOptions>({
    // Set initial state for filter options
    accounts: [],
    accountId: '',
    minAmount: '',
    maxAmount: '',
    categoryId: '',
    subcategoryId: '',
    withCharges: '',
    withDebits: '',
    dateFrom: '',
    dateTo: ''
  });
  // Set initial state for filter text
  const [filterText, setFilterText] = useState<string>('');
  // Set initial state for transactions data
  const [transactionsData, setTransactionsData] = useState<ITransaction[]>([]);
  // Set initial state for filtered transactions data
  const [transactionsFilteredData, setTransactionsFilteredData] = useState<ITransaction[]>([]);
  const [page, setPage] = useState(0); // Set initial state for current page
  // Memoize AccountsClient instance
  const accountServices = useMemo(() => new AccountsClient({ apiKey, serverUrl }), [apiKey]);
  // Memoize CategoriesClient instance
  const categoryServices = useMemo(
    () => new CategoriesClient({ apiKey, serverUrl, assetsUrl: `${assetsUrl}/categories/` }),
    [apiKey]
  );
  // Memoize TransactionsClient instance
  const transactionServices = useMemo(() => new TransactionsClient({ apiKey, serverUrl }), [apiKey]);

  const getFiltersFromObject = ({
    accounts,
    accountId,
    categoryId,
    subcategoryId,
    dateFrom,
    dateTo
  }: {
    accounts?: IAccount[] | null;
    accountId?: string | null;
    categoryId?: string | null;
    subcategoryId?: string | null;
    dateFrom?: string | null;
    dateTo?: string | null;
  }) => {
    const tempOptions: any = {}; // Create an empty object to store filtered options
    if (accounts) tempOptions.accounts = accounts; // If accounts parameter is provided, add it to tempOptions
    if (accountId) tempOptions.accountId = accountId; // If accountId parameter is provided, add it to tempOptions
    if (categoryId) tempOptions.categoryId = categoryId; // If categoryId parameter is provided, add it to tempOptions
    // If subcategoryId parameter is provided, add it to tempOptions
    if (subcategoryId) tempOptions.subcategoryId = subcategoryId;
    if (dateFrom) {
      // If dateFrom parameter is provided, convert it to date object and format it to ISO string,
      // then add it to tempOptions
      const date = new Date(parseInt(dateFrom));
      const [splittedDate] = date.toISOString().split('T');
      tempOptions.dateFrom = splittedDate;
    }
    if (dateTo) {
      // If dateTo parameter is provided, convert it to date object and format it to ISO string,
      // then add it to tempOptions
      const date = new Date(parseInt(dateTo));
      const [splittedDate] = date.toISOString().split('T');
      tempOptions.dateTo = splittedDate;
    }
    // Set the defaultFilterOptions property of componentRef.current to tempOptions
    componentRef.current.defaultFilterOptions = tempOptions;
    return tempOptions; // Return the filtered options
  };

  const filterTransactions = useCallback(
    (onSuccess: (response: Transaction[]) => void) => {
      const parsedFilterOptions: IListOptions = {}; // Create an empty object to store parsed filter options
      if (filterOptions) {
        // Check if filterOptions parameter is provided
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
        } = filterOptions; // Destructure filterOptions object to extract individual filter options
        // If minAmount filter option is provided, parse it to float and add it to parsedFilterOptions
        if (minAmount) parsedFilterOptions.minAmount = parseFloat(minAmount);
        // If maxAmount filter option is provided, parse it to integer and add it to parsedFilterOptions
        if (maxAmount) parsedFilterOptions.maxAmount = parseInt(maxAmount);
        // If dateFrom filter option is provided, convert it to date object, get the time in milliseconds,
        // round it down to the nearest integer, and add it to parsedFilterOptions
        if (dateFrom) parsedFilterOptions.dateFrom = Math.floor(new Date(dateFrom).getTime());
        // If dateTo filter option is provided, convert it to date object, get the time in milliseconds,
        // round it down to the nearest integer, and add it to parsedFilterOptions
        if (dateTo) parsedFilterOptions.dateTo = Math.floor(new Date(dateTo).getTime());
        // If withCharges and withDebits filter options are provided and their values are not equal,
        // set the 'charge' property of parsedFilterOptions based on the value of withCharges (parsed as boolean)
        if (withCharges !== withDebits) parsedFilterOptions.charge = withCharges === 'true';
        if (categoryId)
          if (subcategoryId)
            // If subcategoryId filter option is provided,
            // parse it to integer and add it to parsedFilterOptions as categoryId
            parsedFilterOptions.categoryId = parseInt(subcategoryId);
          // If subcategoryId filter option is not provided, parse categoryId to integer
          // and add it to parsedFilterOptions as categoryId
          else parsedFilterOptions.categoryId = parseInt(categoryId);

        // If userId is provided
        if (userId) {
          // Call the transactionServices to fetch the list of transactions with provided filter options
          transactionServices
            .getList(
              accountId.split(',').map((num) => Number(num)),
              { ...parsedFilterOptions, page, field: 'executionDate' }
            )
            .then((response) => {
              onSuccess(response.data); // Call onSuccess callback with the fetched data as argument
              // Set the totalPages property of componentRef.current with the total pages from the response
              componentRef.current.totalPages = response.totalPages;
              // Set the showModalLoading property of componentRef.current to false to hide the loading modal
              componentRef.current.showModalLoading = false;
            })
            .catch(() => {
              toast.error('Um erro ocorreu.'); // Show error toast message if fetching data fails
              // Set the showModalLoading property of componentRef.current to false to hide the loading modal
              componentRef.current.showModalLoading = false;
            });
        }
      }
    },
    [filterOptions, transactionServices, userId, page]
  );

  const handleClickPage = useCallback(
    (e: { detail: number }) => {
      if (filterOptions.accountId) {
        // Show loading modal
        componentRef.current.showModalLoading = true;
        // Update active page in componentRef
        componentRef.current.activePage = Number(e.detail);
        // Update state 'page' with new page number
        setPage(e.detail - 1);
      }
    },
    [filterOptions.accountId] // Dependency: filterOptions.accountId
  );

  const handleFilterText = useCallback(
    (e: { detail: ITransactionFilterEvent }) => {
      // Update state 'filterText' with the filtered text value
      const filter = e.detail.description.toLowerCase();
      setFilterText(filter);
    },
    [] // No dependencies
  );

  const handleFilter = useCallback(
    (e: { detail: ITransactionFilterEvent }) => {
      const { subcategoryId, minAmount, maxAmount, withCharges, withDebits, dateFrom, dateTo } = e.detail;

      let transactions = transactionsData;

      if (subcategoryId !== '') {
        const subCatId = Number(subcategoryId);
        transactions = transactions.filter((tr) => tr.categoryId === subCatId);
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
        const from = new Date(dateFrom);
        from.setDate(from.getDate() + 1);
        from.setHours(0);
        from.setMinutes(0);
        from.setSeconds(0);
        transactions = transactions.filter((tr) => tr.date >= from.getTime());
      }
      if (dateTo !== '') {
        const to = new Date(dateTo);
        to.setDate(to.getDate() + 1);
        to.setHours(23);
        to.setMinutes(59);
        to.setSeconds(59);
        transactions = transactions.filter((tr) => tr.date <= to.getTime());
      }
      if (withCharges === 'false') {
        transactions = transactions.filter((tr) => !tr.charge);
      } else if (withDebits === 'false') {
        transactions = transactions.filter((tr) => tr.charge);
      }

      // Update state 'transactionsData' property with filtered transactions
      componentRef.current.transactionsData = transactions;
    },
    [transactionsData] // Dependency: transactionsData
  );

  const handleSaveTransaction = useCallback(
    (e: { detail: ISubmitEventData }) => {
      // Show loading indicator
      componentRef.current.showModalLoading = true;

      const { transaction, onSuccess } = e.detail;
      const newTransaction = new TransactionPayload({ ...transaction });

      // Call the create() method of transactionServices to create a new transaction
      transactionServices
        .create(newTransaction)
        .then(() => {
          // Update transactions data and filter transactions
          filterTransactions((transactionsRes: Transaction[]) => {
            setTransactionsData(transactionsRes);
            setTransactionsFilteredData(transactionsRes);
            // Update isEmpty property in componentRef based on transactions length
            if (transactionsRes.length > 0) componentRef.current.isEmpty = false;
            else componentRef.current.isEmpty = true;
            onSuccess();
            // Show success toast
            toast.success('Novo movimento adicionado.');
            // Hide loading indicator
            componentRef.current.showModalLoading = false;
          });
        })
        .catch(() => {
          // Show error toast and hide loading indicator on error
          toast.error('Um erro ocorreu.');
          componentRef.current.showModalLoading = false;
        });
    },
    [transactionServices, filterTransactions]
  );

  const handleEditTransaction = useCallback(
    (e: { detail: ISubmitEventData }) => {
      // Show loading indicator
      componentRef.current.showModalLoading = true;

      const { transaction, onSuccess } = e.detail;
      const { id, ...rest } = transaction;
      const editedTransaction = new TransactionPayload({ ...rest });

      // Call the edit() method of transactionServices to edit an existing transaction
      transactionServices
        .edit(id!, editedTransaction)
        .then(() => {
          // Update transactions data and filter transactions
          filterTransactions((transactionsRes: Transaction[]) => {
            setTransactionsData(transactionsRes);
            setTransactionsFilteredData(transactionsRes);
            onSuccess();
            // Show success toast
            toast.success('Alterações salvas.');
            // Hide loading indicator
            componentRef.current.showModalLoading = false;
          });
        })
        .catch(() => {
          // Show error toast and hide loading indicator on error
          toast.error('Um erro ocorreu.');
          componentRef.current.showModalLoading = false;
        });
    },
    [transactionServices, filterTransactions]
  );

  const handleDeleteTransaction = useCallback(
    (e: { detail: IDeleteEventData }) => {
      // Show loading indicator
      componentRef.current.showModalLoading = true;

      const { transactionId, onSuccess } = e.detail;

      // Call the delete() method of transactionServices to delete a transaction
      transactionServices
        .delete(transactionId)
        .then(() => {
          // Update transactions data and filter transactions
          filterTransactions((transactionsRes: Transaction[]) => {
            setTransactionsData(transactionsRes);
            setTransactionsFilteredData(transactionsRes);
            // Update isEmpty property in componentRef based on transactions length
            if (transactionsRes.length > 0) componentRef.current.isEmpty = false;
            else componentRef.current.isEmpty = true;
            onSuccess();
            // Show success toast
            toast.success('Movimiento apagado.');
            // Hide loading indicator
            componentRef.current.showModalLoading = false;
          });
        })
        .catch(() => {
          // Show error toast and hide loading indicator on error
          toast.error('Um erro ocorreu.');
          componentRef.current.showModalLoading = false;
        });
    },
    [transactionServices, filterTransactions]
  );

  const handleChangeAccount = useCallback(
    (e: React.ChangeEvent<HTMLSelectElement>) => {
      const accountId = e.target.value === '' ? filterOptions.accounts.map((acc) => acc.id).join(',') : e.target.value;
      // Show loading indicator
      componentRef.current.showModalLoading = true;

      // Update activePage, setPage, and filterOptions based on the selected account value
      componentRef.current.activePage = 1;
      setPage(0);
      setFilterOptions({ ...filterOptions, accountId });

      // Hide loading indicator
      componentRef.current.showModalLoading = false;
    },
    [filterOptions, componentRef]
  );

  useEffect(() => {
    // Filter transactionsData based on filterText and update transactionsFilteredData
    setTransactionsFilteredData(
      transactionsData.filter((tr) => tr.description.toLowerCase().indexOf(filterText) !== -1)
    );
  }, [filterText, transactionsData]);

  useEffect(() => {
    if (userId) {
      // Fetch categories list with subcategories for the given userId
      categoryServices
        .getListWithSubcategories(userId)
        .then((response) => {
          // Update categoriesData in componentRef with the fetched data
          componentRef.current.categoriesData = response;
        })
        .catch((error) => {
          // Show error toast on error
          showErrorToast(error);
        });
    }
  }, [categoryServices, userId]);

  useEffect(() => {
    if (userId) {
      // Get query parameters from searchParams
      const accountIdParam = searchParams.get('account_id');
      const subcategoryId = searchParams.get('subcategory_id');
      const categoryId = searchParams.get('category_id');
      const dateFrom = searchParams.get('date_from');
      const dateTo = searchParams.get('date_to');

      // Show loading indicator
      componentRef.current.showMainLoading = true;
      componentRef.current.transactionsData = [];
      componentRef.current.accountsData = [];
      componentRef.current.categoriesData = [];

      // Fetch accounts list for the given userId
      accountServices
        .getList(userId)
        .then((response: Account[]) => {
          const accounts = response.map((acc: Account) => acc);
          // Update accountsData in componentRef with the fetched data
          componentRef.current.accountsData = response;

          if (accounts.length > 0) {
            if (accountIdParam)
              // Update filterOptions based on query parameters and fetched accounts data
              setFilterOptions(
                getFiltersFromObject({
                  accounts,
                  accountId: accountIdParam,
                  categoryId,
                  subcategoryId,
                  dateFrom,
                  dateTo
                })
              );
            // Update filterOptions with default values based on fetched accounts data
            else
              setFilterOptions(
                getFiltersFromObject({
                  accounts,
                  accountId: accounts[0].id.toString(),
                  categoryId,
                  subcategoryId,
                  dateFrom,
                  dateTo
                })
              );
          } else {
            // Hide loading indicator and set isEmpty to true in componentRef if accounts are empty
            componentRef.current.showMainLoading = false;
            componentRef.current.isEmpty = true;
          }
        })
        .catch((error) => {
          // Show error toast on error
          showErrorToast(error);
        });
    }
  }, [accountServices, searchParams, userId]);

  useEffect(() => {
    // Sets a loading state before filtering transactions
    componentRef.current.showMainLoading = true;
    if (filterOptions.accounts.length > 0) {
      // Calls the filterTransactions function and provides a callback for handling filtered transactions
      filterTransactions((transactionsRes: Transaction[]) => {
        if (transactionsRes.length) {
          // If filtered transactions are not empty, sets isEmpty state to false,
          // updates transactions data and filtered data
          componentRef.current.isEmpty = false;
          setTransactionsData(transactionsRes);
          setTransactionsFilteredData(transactionsRes);
        } else {
          // If filtered transactions are empty, sets isEmpty state to true
          componentRef.current.isEmpty = true;
        }
        // Hides the loading state after filtering transactions
        componentRef.current.showMainLoading = false;
      });
    }
  }, [filterOptions.accounts, filterTransactions, filterOptions]);

  useEffect(() => {
    const componentRefCurrent = componentRef.current;
    // Adds event listeners for different actions on the component
    componentRefCurrent.addEventListener('save-new', handleSaveTransaction);
    componentRefCurrent.addEventListener('save-edit', handleEditTransaction);
    componentRefCurrent.addEventListener('delete', handleDeleteTransaction);
    componentRefCurrent.addEventListener('filter-trigger', handleFilter);
    componentRefCurrent.addEventListener('filter-text-trigger', handleFilterText);
    componentRefCurrent.addEventListener('click-page', handleClickPage);
    componentRefCurrent.addEventListener('click-prev-page', handleClickPage);
    componentRefCurrent.addEventListener('click-next-page', handleClickPage);
    // Sets component styles
    componentRefCurrent.componentStyles = `
      .obwc-sidebar-modal__body form .obwc-filter-transactions-modal__row:first-child{
        display:none;
      }
    `;

    return () => {
      // Removes event listeners when component is unmounted or dependencies change
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
    // Updates the transactions data in the component and scrolls to view
    componentRef.current.transactionsData = transactionsFilteredData;
    componentRef.current.scrollIntoView();
  }, [transactionsFilteredData]);

  return (
    <>
      {filterOptions.accounts.length > 0 && (
        // Render select input element only if there are accounts available
        <div className="selectContainer">
          <select onChange={handleChangeAccount} value={filterOptions.accountId}>
            <option value="">Todas as contas</option>
            {/* Map through filterOptions.accounts array to render options */}
            {filterOptions.accounts.map((account) => (
              <option key={account.id} value={account.id}>
                {unicodeToChar(account.name)}
              </option>
            ))}
          </select>
        </div>
      )}
      <ob-transactions-component
        ref={componentRef} // Reference to the component for later use
        alertType="warning" // Type of alert to show, e.g. warning
        showAlert={isProcessing} // Whether to show the alert or not, based on isProcessing value
        alertText={alertText} // Text to display in the alert
        fontFamily="Lato" // Font family for the component
        searchDebounceTime={500} // Debounce time for search functionality in milliseconds
        activePage={1} // Active page number for pagination
      />
    </>
  );
};

export default TransactionsComponent;
