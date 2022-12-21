import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { useOutletContext } from 'react-router-dom';
import { toast } from 'react-toastify';

import {
  CategoriesClient,
  Category,
  CategoryPayload,
  CONSENT_REQUESTED_STATUS,
  CONSENT_GRANTED_STATUS,
  CONSENT_DELETED_STATUS,
  AGGREGATION_STARTED_STATUS,
  AGGREGATION_COMPLETED_STATUS,
  PROCESS_FAILED_STATUS
} from '../../libs/sdk';
import { PlainObject } from '../../libs/sdk/types';
import '../../libs/wc/ob-categories-component';

const userId = 2230376;
interface ISubmitEventData {
  category: {
    id?: number;
    name: string;
    color: string;
    parentCategoryId: number | null;
  };
  onSuccess: () => void;
}
const CategoriesComponent = () => {
  const componentRef = useRef<any>(null);
  const { aggStatus } = useOutletContext<{ aggStatus: string | null }>();
  const categoriesServices = useMemo(() => new CategoriesClient('XXXX-XXXX-XXXX', true), []);
  const [categories, setCategories] = useState<PlainObject[]>([]);
  const getCategories = useCallback(
    (onSuccess: () => void) => {
      if (categoriesServices && componentRef.current !== null) {
        categoriesServices.getListWithSubcategories(`${userId}`).then((response: Category[]) => {
          setCategories(response.map((category) => category.getPlainObject()));
          onSuccess();
        });
      }
    },
    [categoriesServices, componentRef]
  );

  const handleSaveCategory = useCallback(
    (e: { detail: ISubmitEventData }) => {
      const { category, onSuccess } = e.detail;
      const newCategory = new CategoryPayload({ userId, ...category });
      categoriesServices.create(newCategory).then((response: Category) => {
        toast.success('Categoria adicionada.');
        setCategories([response.getPlainObject(), ...categories]);
        onSuccess();
      });
    },
    [categoriesServices, categories]
  );

  const handleSaveSubcategory = useCallback(
    (e: { detail: ISubmitEventData }) => {
      const { category, onSuccess } = e.detail;
      const newCategory = new CategoryPayload({ userId, ...category });
      categoriesServices.create(newCategory).then((response: Category) => {
        toast.success('Subcategoria adicionada.');
        setCategories([response.getPlainObject(), ...categories]);
        onSuccess();
      });
    },
    [categoriesServices, categories]
  );

  /* const handleEditAccount = useCallback(
    (e: { detail: ISubmitEventData }) => {
      const { account, onSuccess } = e.detail;
      const { id, financialEntityId, ...rest } = account;
      const editedAccount = new CategoryPayload({ userId, financialEntityId: parseInt(financialEntityId), ...rest });
      categoriesServices.edit(id!, editedAccount).then((response: Category) => {
        setCategories(
          categories.map((categoryItem) => {
            if (categoryItem.id === id) {
              return response.getPlainObject();
            }
            return categoryItem;
          })
        );
        onSuccess();
      });
    },
    [categoriesServices, categories]
  );

  const handleDeleteAccount = useCallback(
    (e: { detail: IDeleteEventData }) => {
      const { accountId, onSuccess } = e.detail;
      categoriesServices.delete(accountId).then((response: boolean) => {
        if (response) {
          setCategories(categories.filter((categoryItem) => categoryItem.id !== accountId));
          onSuccess();
          toast.success('Conta apagada.');
        }
      });
    },
    [categoriesServices, categories]
  ); */

  useEffect(() => {
    componentRef.current.showMainLoading = true;
    getCategories(() => {
      componentRef.current.showMainLoading = false;
    });
  }, [getCategories]);

  useEffect(() => {
    componentRef.current.categoriesData = categories;
  }, [componentRef, categories]);

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
    componentRefCurrent.addEventListener('save-new', handleSaveCategory);
    componentRefCurrent.addEventListener('save-new-subcategory', handleSaveSubcategory);

    /* componentRefCurrent.addEventListener('save-edit', handleEditAccount);
    componentRefCurrent.addEventListener('delete', handleDeleteAccount) */ return () => {
      componentRefCurrent.removeEventListener('save-new', handleSaveCategory);
      componentRefCurrent.removeEventListener('save-new-subcategory', handleSaveSubcategory);
      /* componentRefCurrent.removeEventListener('save-edit', handleEditAccount);
      componentRefCurrent.removeEventListener('delete', handleDeleteAccount); */
    };
  }, [handleSaveCategory, handleSaveSubcategory]);

  return <ob-categories-component ref={componentRef} lang="pt" currencyLang="pt-BR" currencyType="BRL" />;
};

export default CategoriesComponent;
