import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { useOutletContext } from 'react-router-dom';
import { toast } from 'react-toastify';

import { CategoriesClient, Category, CategoryPayload } from 'open-banking-pfm-sdk';
import { ICategory, ICategoryUpdatePayload } from 'open-banking-pfm-sdk/interfaces';
import { API_KEY, URL_SERVER } from '../../constants';

import { IOutletContext } from '../../interfaces';

interface ISubmitEventData {
  category?: {
    id: number;
    name: string;
    color: string;
    parentCategoryId: number | null;
    subcategories: any[];
  };
  id?: number;
  onSuccess: () => void;
  showToast: () => void;
}
const CategoriesComponent = () => {
  const componentRef = useRef<any>(null);
  const { isProcessing, alertText, userId } = useOutletContext<IOutletContext>();
  const categoriesServices = useMemo(() => new CategoriesClient(API_KEY, URL_SERVER), []);
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
        const newCategory = new CategoryPayload({ userId, ...category! });
        categoriesServices.create(newCategory).then(() => {
          toast.success('Categoria adicionada.');
          getCategories(() => onSuccess());
        });
      }
    },
    [categoriesServices, userId, getCategories]
  );

  const handleSaveSubcategory = useCallback(
    (e: { detail: ISubmitEventData }) => {
      if (userId) {
        const { category, onSuccess } = e.detail;
        const newCategory = new CategoryPayload({ userId, ...category! });
        categoriesServices.create(newCategory).then((_response: Category) => {
          toast.success('Subcategoria adicionada.');
          getCategories(() => onSuccess());
        });
      }
    },
    [categoriesServices, userId, getCategories]
  );

  const handleEditCategory = useCallback(
    (e: { detail: ISubmitEventData }) => {
      const { category, onSuccess } = e.detail;
      const { id, name, color, parentCategoryId } = category!;
      const editedCategory: ICategoryUpdatePayload = { name, color, parentCategoryId };
      categoriesServices.edit(id, editedCategory).then(() => {
        toast.success('Categoria editada.');
        getCategories(() => onSuccess());
      });
    },
    [categoriesServices, getCategories]
  );

  const handleEditSubCategory = useCallback(
    (e: { detail: ISubmitEventData }) => {
      const { category, onSuccess } = e.detail;
      const { id, name, color, parentCategoryId } = category!;
      const editedCategory: ICategoryUpdatePayload = { name, color, parentCategoryId };
      categoriesServices.edit(id, editedCategory).then(() => {
        toast.success('Subcategoria editada.');
        getCategories(() => onSuccess());
      });
    },
    [categoriesServices, getCategories]
  );

  const handleDeleteCategory = useCallback(
    (e: { detail: ISubmitEventData }) => {
      componentRef.current.showModalLoading = true;
      const { id, onSuccess } = e.detail;
      if (id)
        categoriesServices
          .delete(id)
          .then((response: boolean) => {
            if (response) {
              getCategories(() => onSuccess());
              onSuccess();
              toast.success('Categoria apagada.');
            }
            componentRef.current.showModalLoading = false;
          })
          .catch(() => {
            toast.error('Um erro ocorreu.');
            componentRef.current.showModalLoading = false;
          });
    },
    [categoriesServices, getCategories]
  );

  const handleDeleteSubCategory = useCallback(
    (e: { detail: ISubmitEventData }) => {
      componentRef.current.showModalLoading = true;
      const { id, onSuccess } = e.detail;
      if (id)
        categoriesServices
          .delete(id)
          .then((response: boolean) => {
            if (response) {
              getCategories(() => onSuccess());
              onSuccess();
              toast.success('Subcategoria apagada.');
            }
            componentRef.current.showModalLoading = false;
          })
          .catch(() => {
            toast.error('Um erro ocorreu.');
            componentRef.current.showModalLoading = false;
          });
    },
    [categoriesServices, getCategories]
  );

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
    componentRefCurrent.addEventListener('delete-own-category', handleDeleteCategory);
    componentRefCurrent.addEventListener('delete-own-subcategory', handleDeleteSubCategory);
    componentRefCurrent.addEventListener('edit-category', handleEditCategory);
    componentRefCurrent.addEventListener('edit-subcategory', handleEditSubCategory);
    return () => {
      componentRefCurrent.removeEventListener('save-new', handleSaveCategory);
      componentRefCurrent.removeEventListener('save-new-subcategory', handleSaveSubcategory);
      componentRefCurrent.removeEventListener('delete-own-category', handleDeleteCategory);
      componentRefCurrent.addEventListener('delete-own-subcategory', handleDeleteSubCategory);
      componentRefCurrent.addEventListener('edit-category', handleEditCategory);
      componentRefCurrent.addEventListener('edit-subcategory', handleEditSubCategory);
    };
  }, [
    handleSaveCategory,
    handleSaveSubcategory,
    handleDeleteCategory,
    handleDeleteSubCategory,
    handleEditCategory,
    handleEditSubCategory
  ]);

  return (
    <ob-categories-component
      alertType="warning"
      showAlert={isProcessing}
      alertText={alertText}
      ref={componentRef}
      lang="pt"
      currencyLang="pt-BR"
      currencyType="BRL"
      deleteCategoryDisabled
      editCategoryDisabled
      editSubcategoryDisabled
    />
  );
};

export default CategoriesComponent;
