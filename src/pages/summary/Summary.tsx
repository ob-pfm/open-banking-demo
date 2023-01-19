import { useCallback, useEffect, useMemo, useRef } from 'react';
import { useOutletContext, createSearchParams, useNavigate } from 'react-router-dom';

import { CategoriesClient, ParentCategory, InsightsClient, Resume } from '../../libs/sdk';
import { API_KEY } from '../../constants';

import { IOutletContext } from '../../interfaces';
import { showErrorToast } from '../../helpers';

const getDateRange = (date: Date) => {
  const month = date.getMonth();
  const year = date.getFullYear();
  return {
    iniDate: new Date(year, month, 1).getTime(),
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
  const { alertIsShown, alertText, userId } = useOutletContext<IOutletContext>();
  const categoryServices = useMemo(() => new CategoriesClient(API_KEY, true), []);
  const insightsServices = useMemo(() => new InsightsClient(API_KEY, true), []);

  const handleSubcategoryDetailClick = useCallback(
    (e: { detail: ISubmitEventData }) => {
      const { summary, date } = e.detail;
      const { iniDate, endDate } = getDateRange(new Date(date));
      navigate({
        pathname: '../movimientos',
        search: createSearchParams({
          category_id: `${summary.parentCategoryId}`,
          subcategory_id: `${summary.categoryId}`,
          date_from: `${iniDate}`,
          date_to: `${endDate}`
        }).toString()
      });
    },
    [navigate]
  );

  const handleTransactionDetailClick = useCallback(
    (e: { detail: ISubmitEventData }) => {
      const { summary, date } = e.detail;
      const { iniDate, endDate } = getDateRange(new Date(date));
      navigate({
        pathname: '../movimientos',
        search: createSearchParams({
          category_id: `${summary.categoryId}`,
          date_from: `${iniDate}`,
          date_to: `${endDate}`
        }).toString()
      });
    },
    [navigate]
  );

  useEffect(() => {
    if (userId) {
      componentRef.current.showMainLoading = true;
      componentRef.current.categoriesData = [];
      componentRef.current.summaryData = {
        incomes: [],
        expenses: [],
        balances: []
      };
      categoryServices
        .getListWithSubcategories(userId)
        .then((response: ParentCategory[]) => {
          componentRef.current.categoriesData = response.map((category) => ({
            ...category.toObject(),
            subcategories: category.subcategories.map((subcategory: any) => subcategory.toObject())
          }));
          return insightsServices.getResume(userId);
        })
        .then((response: Resume) => {
          if (response && response.balances && response.expenses && response.incomes) {
            componentRef.current.summaryData = {
              balances: response.balances,
              expenses: response.expenses,
              incomes: response.incomes
            };
          } else {
            componentRef.current.isEmpty = true;
          }
          componentRef.current.showMainLoading = false;
        })
        .catch((error) => {
          showErrorToast(error);
          // e.detail.showToast('error', 'Error de servidor');
        });
    }
  }, [insightsServices, categoryServices, userId]);

  useEffect(() => {
    const componentRefCurrent = componentRef.current;
    componentRefCurrent.addEventListener('subcategory-detail-click', handleSubcategoryDetailClick);
    componentRefCurrent.addEventListener('transactions-detail-click', handleTransactionDetailClick);

    return () => {
      componentRefCurrent.removeEventListener('subcategory-detail-click', handleSubcategoryDetailClick);
      componentRefCurrent.removeEventListener('transactions-detail-click', handleTransactionDetailClick);
    };
  }, [handleSubcategoryDetailClick, handleTransactionDetailClick]);
  return (
    <ob-summary-component
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

export default SummaryComponent;
