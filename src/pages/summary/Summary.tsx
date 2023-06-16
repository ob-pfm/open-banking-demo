import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { useOutletContext, useNavigate } from 'react-router-dom';

import { CategoriesClient, InsightsClient, AccountsClient, Account } from 'open-banking-pfm-sdk';
import { URL_SERVER as serverUrl, URL_ASSETS as assetsUrl } from '../../constants';

import { IOutletContext } from '../../interfaces';
import { showErrorToast, unicodeToChar } from '../../helpers';

import './summary.css';
import '../../libs/wc/ob-summary-component';

// Get date range based on a given date
const getDateRange = (date: Date) => {
  const month = date.getMonth();
  const year = date.getFullYear();
  return {
    iniDate: new Date(year, month, 1).getTime(),
    endDate: new Date(month === 11 ? year + 1 : year, month === 11 ? 0 : month + 1, 1).getTime()
  };
};

// Interface for event data used in the component
interface ISubmitEventData {
  summary: { categoryId: number; parentCategoryId: number };
  date: number | string;
}

const SummaryComponent = () => {
  const componentRef = useRef<any>(null);
  const navigate = useNavigate();
  const { isProcessing, alertText, userId, apiKey } = useOutletContext<IOutletContext>();
  const categoryServices = useMemo(
    () => new CategoriesClient({ apiKey, serverUrl, assetsUrl: `${assetsUrl}/categories/` }),
    [apiKey]
  );
  const insightsServices = useMemo(() => new InsightsClient({ apiKey, serverUrl }), [apiKey]);
  const accountServices = useMemo(() => new AccountsClient({ apiKey, serverUrl }), [apiKey]);
  const [accountId, setAccountId] = useState<number | string>(0);
  const [accountsList, setAccountsList] = useState<Account[]>([]);

  // Handle subcategory detail click event
  const handleSubcategoryDetailClick = useCallback(
    (e: { detail: ISubmitEventData }) => {
      const { summary, date } = e.detail;
      const offset = new Date().getTimezoneOffset();
      const offsetDate = new Date(Number(date) + offset * 60 * 1000);
      const { iniDate, endDate } = getDateRange(offsetDate);
      const accountIds = accountId === '' || accountId === 0 ? accountsList.map((acc) => acc.id).join(',') : accountId;
      navigate({
        pathname: '../movimientos',
        search: `account_id=${accountIds}&category_id=${summary.parentCategoryId}&subcategory_id=${summary.categoryId}&date_from=${iniDate}&date_to=${endDate}`
      });
    },
    [navigate, accountId, accountsList]
  );

  // Handle transaction detail click event
  const handleTransactionDetailClick = useCallback(
    (e: { detail: ISubmitEventData }) => {
      const { date } = e.detail;
      const offset = new Date().getTimezoneOffset();
      const offsetDate = new Date(Number(date) + offset * 60 * 1000);
      const { iniDate, endDate } = getDateRange(offsetDate);
      const accountIds = accountId === '' || accountId === 0 ? accountsList.map((acc) => acc.id).join(',') : accountId;
      navigate({
        pathname: '../movimientos',
        search: `account_id=${accountIds}&date_from=${iniDate}&date_to=${endDate}`
      });
    },
    [navigate, accountId, accountsList]
  );

  // Handle empty action click event
  const handleEmptyActionClick = useCallback(() => {
    navigate({
      pathname: '../movimientos'
    });
  }, [navigate]);

  // Handle change account event
  const handleChangeAccount = useCallback((e: React.ChangeEvent<HTMLSelectElement>) => {
    setAccountId(Number(e.target.value));
  }, []);

  // Fetch accounts list when userId changes
  useEffect(() => {
    if (userId) {
      accountServices
        .getList(userId)
        .then((response) => {
          setAccountsList(response);
          if (response.length > 0) setAccountId('');
        })
        .catch(() => setAccountsList([]));
    }
  }, [accountServices, userId]);

  useEffect(() => {
    if (userId) {
      // Show main loading while data is being fetched
      componentRef.current.showMainLoading = true;
      // Initialize categoriesData as an empty array
      componentRef.current.categoriesData = [];
      // Make API call to get categories with subcategories
      categoryServices
        .getListWithSubcategories(userId)
        .then((response) => {
          // Transform the response data and update categoriesData
          componentRef.current.categoriesData = response;
          // Hide main loading on success
          componentRef.current.showMainLoading = false;
        })
        .catch((error) => {
          // Show error toast on failure
          showErrorToast(error);
        });
    }
  }, [categoryServices, userId]);

  useEffect(() => {
    if (userId) {
      // Show main loading while data is being fetched
      componentRef.current.showMainLoading = true;
      // Initialize summaryData with empty arrays for incomes, expenses, and balances
      componentRef.current.summaryData = {
        incomes: [],
        expenses: [],
        balances: []
      };
      // Make API call to get summary data for a specific account or all accounts
      const request =
        accountId === 0
          ? insightsServices.getResume(userId)
          : insightsServices.getResume(userId, { accountIds: Number(accountId) });
      request
        .then((insights) => {
          if (insights && (insights.incomes.length > 0 || insights.expenses.length > 0)) {
            // Update summaryData with the fetched data
            componentRef.current.summaryData = {
              balances: insights.balances,
              expenses: insights.expenses,
              incomes: insights.incomes
            };
            // Set isEmpty to false if there are incomes or expenses
            componentRef.current.isEmpty = false;
          } else {
            // Set isEmpty to true if there are no incomes or expenses
            componentRef.current.isEmpty = true;
          }
          // Hide main loading on success
          componentRef.current.showMainLoading = false;
        })
        .catch((error) => {
          // Show error toast on failure
          componentRef.current.isEmpty = true;
          componentRef.current.showMainLoading = false;
          showErrorToast(error);
        });
    }
  }, [insightsServices, categoryServices, userId, accountServices, accountId]);

  useEffect(() => {
    // Add event listeners and update component styles
    const componentRefCurrent = componentRef.current;
    componentRefCurrent.addEventListener('subcategory-detail-click', handleSubcategoryDetailClick); // Add event listener for 'subcategory-detail-click' event
    componentRefCurrent.addEventListener('transactions-detail-click', handleTransactionDetailClick); // Add event listener for 'transactions-detail-click' event
    componentRefCurrent.addEventListener('empty-button-click', handleEmptyActionClick); // Add event listener for 'empty-button-click' event
    componentRefCurrent.componentStyles = `
      .obwc-onboarding__container .obwc-onboarding__close-button{
        display:none;
      }
      .obwc-expenses__table-transactions-icon{
        display:none;
      }
    `; // Update component styles with CSS rules

    // Remove event listeners on unmount
    return () => {
      componentRefCurrent.removeEventListener('subcategory-detail-click', handleSubcategoryDetailClick); // Remove event listener for 'subcategory-detail-click' event
      componentRefCurrent.removeEventListener('transactions-detail-click', handleTransactionDetailClick); // Remove event listener for 'transactions-detail-click' event
      componentRefCurrent.addEventListener('empty-button-click', handleEmptyActionClick); // Remove event listener for 'empty-button-click' event
    };
  }, [handleSubcategoryDetailClick, handleTransactionDetailClick, handleEmptyActionClick]);

  return (
    <>
      {accountsList.length && (
        // Render a div with class name "selectContainer" if accountsList has length greater than 0
        <div className="selectContainer">
          <select onChange={handleChangeAccount}>
            <option value="">Todas as contas</option>
            {accountsList.map((account) => (
              <option key={account.id} value={account.id}>
                {unicodeToChar(account.name)}
              </option>
            ))}
          </select>
        </div>
      )}
      <ob-summary-component
        ref={componentRef} // Pass a ref to the ob-summary-component component
        alertType="warning" // Pass the prop "alertType" with the value "warning"
        showAlert={isProcessing} // Pass the prop "showAlert" with the value of the "isProcessing" variable
        alertText={alertText} // Pass the prop "alertText" with the value of the "alertText" variable
        fontFamily="Lato" // Pass the prop "fontFamily" with the value "Lato"
        emptyViewActionText="Agregar movimento" // Pass the prop "emptyViewActionText" with the value "Agregar movimento"
      />
    </>
  );
};

export default SummaryComponent;
