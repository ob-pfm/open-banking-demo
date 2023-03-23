import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { useOutletContext, createSearchParams, useNavigate } from 'react-router-dom';

import { CategoriesClient, InsightsClient, AccountsClient, Account } from 'open-banking-pfm-sdk';
import { URL_SERVER } from '../../constants';

import '../../libs/wc/ob-summary-component';
import { IOutletContext } from '../../interfaces';
import { showErrorToast } from '../../helpers';

import './summary.css';

const getDateRange = (date: Date) => {
  const month = date.getMonth();
  const year = date.getFullYear();
  return {
    iniDate: new Date(year, month - 6, 1).getTime(),
    endDate: new Date(month === 11 ? year + 1 : year, month === 11 ? 0 : month + 1, 1).getTime()
  };
};

interface ISubmitEventData {
  summary: { categoryId: number; parentCategoryId: number };
  date: number | string;
}

const SummaryComponent = () => {
  const componentRef = useRef<any>(null);
  const navigate = useNavigate();
  const { isProcessing, alertText, userId, apiKey } = useOutletContext<IOutletContext>();
  const categoryServices = useMemo(() => new CategoriesClient(apiKey, URL_SERVER), [apiKey]);
  const insightsServices = useMemo(() => new InsightsClient(apiKey, URL_SERVER), [apiKey]);
  const accountServices = useMemo(() => new AccountsClient(apiKey, URL_SERVER), [apiKey]);
  const [accountId, setAccountId] = useState<number>(0);
  const [accountsList, setAccountsList] = useState<Account[]>([]);

  const handleSubcategoryDetailClick = useCallback(
    (e: { detail: ISubmitEventData }) => {
      const { summary, date } = e.detail;
      const { iniDate, endDate } = getDateRange(new Date(date));
      navigate({
        pathname: '../movimientos',
        search: createSearchParams({
          account_id: `${accountId}`,
          category_id: `${summary.parentCategoryId}`,
          subcategory_id: `${summary.categoryId}`,
          date_from: `${iniDate}`,
          date_to: `${endDate}`
        }).toString()
      });
    },
    [navigate, accountId]
  );

  const handleTransactionDetailClick = useCallback(
    (e: { detail: ISubmitEventData }) => {
      const { date } = e.detail;
      const { iniDate, endDate } = getDateRange(new Date(date));
      navigate({
        pathname: '../movimientos',
        search: createSearchParams({
          account_id: `${accountId}`,
          date_from: `${iniDate}`,
          date_to: `${endDate}`
        }).toString()
      });
    },
    [navigate, accountId]
  );

  const handleEmptyActionClick = useCallback(() => {
    navigate({
      pathname: '../movimientos'
    });
  }, [navigate]);

  const handleChangeAccount = useCallback((e: React.ChangeEvent<HTMLSelectElement>) => {
    setAccountId(Number(e.target.value));
  }, []);

  useEffect(() => {
    if (userId) {
      accountServices
        .getList(userId)
        .then((response) => {
          setAccountsList(response);
          if (response.length > 0) setAccountId(response[0].id);
        })
        .catch(() => setAccountsList([]));
    }
  }, [accountServices, userId]);

  useEffect(() => {
    if (userId) {
      componentRef.current.showMainLoading = true;
      componentRef.current.categoriesData = [];
      categoryServices
        .getListWithSubcategories(userId)
        .then((response) => {
          componentRef.current.categoriesData = response.map((category) => ({
            ...category.toObject(),
            subcategories: category.subcategories.map((subcategory: any) => subcategory.toObject())
          }));
          componentRef.current.showMainLoading = false;
        })
        .catch((error) => {
          showErrorToast(error);
        });
    }
  }, [categoryServices, userId]);

  useEffect(() => {
    if (userId) {
      componentRef.current.showMainLoading = true;
      componentRef.current.summaryData = {
        incomes: [],
        expenses: [],
        balances: []
      };
      if (accountId !== 0) {
        insightsServices
          .getResume(userId, { accountId })
          .then((insights) => {
            if (insights && (insights.incomes.length > 0 || insights.expenses.length > 0)) {
              componentRef.current.summaryData = {
                balances: insights.balances,
                expenses: insights.expenses,
                incomes: insights.incomes
              };
              componentRef.current.isEmpty = false;
            } else componentRef.current.isEmpty = true;

            componentRef.current.showMainLoading = false;
          })
          .catch((error) => {
            showErrorToast(error);
          });
      }
    }
  }, [insightsServices, categoryServices, userId, accountServices, accountId]);

  useEffect(() => {
    const componentRefCurrent = componentRef.current;
    componentRefCurrent.addEventListener('subcategory-detail-click', handleSubcategoryDetailClick);
    componentRefCurrent.addEventListener('transactions-detail-click', handleTransactionDetailClick);
    componentRefCurrent.addEventListener('empty-button-click', handleEmptyActionClick);
    componentRefCurrent.componentStyles = `
      .obwc-expenses__table-transactions-icon{
        display:none;
      }
    `;

    return () => {
      componentRefCurrent.removeEventListener('subcategory-detail-click', handleSubcategoryDetailClick);
      componentRefCurrent.removeEventListener('transactions-detail-click', handleTransactionDetailClick);
      componentRefCurrent.addEventListener('empty-button-click', handleEmptyActionClick);
    };
  }, [handleSubcategoryDetailClick, handleTransactionDetailClick, handleEmptyActionClick]);
  return (
    <>
      <div className="selectContainer">
        <select onChange={handleChangeAccount}>
          {accountsList &&
            accountsList.map((account) => (
              <option key={account.id} value={account.id}>
                {account.name}
              </option>
            ))}
        </select>
      </div>
      <ob-summary-component
        ref={componentRef}
        alertType="warning"
        showAlert={isProcessing}
        alertText={alertText}
        fontFamily="Lato"
        lang="pt"
        currencyLang="pt-BR"
        currencyType="BRL"
        emptyViewActionText="Agregar movimento"
      />
    </>
  );
};

export default SummaryComponent;
