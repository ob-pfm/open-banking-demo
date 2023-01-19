import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { useOutletContext } from 'react-router-dom';
import { toast } from 'react-toastify';

import { CategoriesClient, Category, CategoryPayload } from 'open-banking-pfm-sdk';
import { ICategory } from 'open-banking-pfm-sdk/interfaces';
import { API_KEY } from '../../constants';

import { IOutletContext } from '../../interfaces';

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
  const { alertIsShown, alertText, userId } = useOutletContext<IOutletContext>();
  const categoriesServices = useMemo(() => new CategoriesClient(API_KEY), []);
  const [categories, setCategories] = useState<ICategory[]>([]);
  const getCategories = useCallback(
    (onSuccess: () => void) => {
      if (categoriesServices && componentRef.current !== null) {
        categoriesServices.getListWithSubcategories(`${userId}`).then((response: Category[]) => {
          setCategories(response.map((category) => category.toObject()));
          onSuccess();
        });
      }
    },
    [categoriesServices, componentRef, userId]
  );

  const handleSaveCategory = useCallback(
    (e: { detail: ISubmitEventData }) => {
      if (userId) {
        const { category, onSuccess } = e.detail;
        const newCategory = new CategoryPayload({ userId, ...category });
        categoriesServices.create(newCategory).then((response: Category) => {
          toast.success('Categoria adicionada.');
          setCategories([response.toObject(), ...categories]);
          onSuccess();
        });
      }
    },
    [categoriesServices, categories, userId]
  );

  const handleSaveSubcategory = useCallback(
    (e: { detail: ISubmitEventData }) => {
      if (userId) {
        const { category, onSuccess } = e.detail;
        const newCategory = new CategoryPayload({ userId, ...category });
        categoriesServices.create(newCategory).then((response: Category) => {
          toast.success('Subcategoria adicionada.');
          setCategories([response.toObject(), ...categories]);
          onSuccess();
        });
      }
    },
    [categoriesServices, categories, userId]
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

  return (
    <ob-categories-component
      alertType="warning"
      showAlert={alertIsShown}
      alertText={alertText}
      ref={componentRef}
      lang="pt"
      currencyLang="pt-BR"
      currencyType="BRL"
    />
  );
};

export default CategoriesComponent;
