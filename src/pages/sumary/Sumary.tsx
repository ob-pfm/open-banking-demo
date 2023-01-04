import { useCallback, useEffect, useMemo, useRef } from 'react';
import { useOutletContext, createSearchParams, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

import {
  CategoriesClient,
  ParentCategory,
  CONSENT_REQUESTED_STATUS,
  CONSENT_GRANTED_STATUS,
  CONSENT_DELETED_STATUS,
  AGGREGATION_STARTED_STATUS,
  AGGREGATION_COMPLETED_STATUS,
  PROCESS_FAILED_STATUS,
  InsightsClient,
  Resume
} from '../../libs/sdk';

import '../../libs/wc/ob-summary-component';

const userId = 2230376;
const getDateRange = (date: Date) => {
  const month = date.getMonth();
  const year = date.getFullYear();
  return {
    iniDate: new Date(year, month, 1).getTime(),
    endDate: new Date(month === 11 ? year + 1 : year, month === 11 ? 0 : month + 1, 1).getTime()
  };
};

interface ISubmitEventData {
  summary: { categoryId: number; parentCategoryId: number; };
  date: number | string;
}

const SumaryComponent = () => {
  const componentRef = useRef<any>(null);
  const navigate = useNavigate();
  const { aggStatus } = useOutletContext<{ aggStatus: string | null }>();
  const categoryServices = useMemo(() => new CategoriesClient('XXXX-XXXX-XXXX', true), []);
  const insightsServices = useMemo(() => new InsightsClient('XXXX-XXXX-XXXX', true), []);

  const handleSubcategoryDetailClick = useCallback((e: { detail: ISubmitEventData }) => {
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
  }, [navigate]);

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
          ...category.getPlainObject(),
          subcategories: category.subcategories.map((subcategory) => subcategory.getPlainObject())
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
      .catch(() => {
        // e.detail.showToast('error', 'Error de servidor');
      });
  }, [insightsServices, categoryServices]);

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
    componentRefCurrent.addEventListener('subcategory-detail-click', handleSubcategoryDetailClick);
    componentRefCurrent.addEventListener('transactions-detail-click', handleTransactionDetailClick);

    return () => {
      componentRefCurrent.removeEventListener('subcategory-detail-click', handleSubcategoryDetailClick);
      componentRefCurrent.removeEventListener('transactions-detail-click', handleTransactionDetailClick);
    };
  }, [handleSubcategoryDetailClick, handleTransactionDetailClick]);
  return (
    <ob-summary-component ref={componentRef} fontFamily="Lato" lang="pt" currencyLang="pt-BR" currencyType="BRL" />
  );
};

export default SumaryComponent;
