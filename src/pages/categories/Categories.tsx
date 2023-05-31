import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { useOutletContext } from 'react-router-dom';
import { toast } from 'react-toastify';

import { CategoriesClient, Category, CategoryPayload } from 'open-banking-pfm-sdk';
import { ICategory, ICategoryUpdatePayload } from 'open-banking-pfm-sdk/interfaces';
import { URL_SERVER as serverUrl } from '../../constants';

import { IOutletContext } from '../../interfaces';

import '../../libs/wc/ob-categories-component';

// Define interface for event data
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

// Define CategoriesComponent functional component
const CategoriesComponent = () => {
  // Ref for component
  const componentRef = useRef<any>(null);

  // Get data from outlet context
  const { isProcessing, alertText, userId, apiKey } = useOutletContext<IOutletContext>();

  // Create CategoriesClient instance with memoized apiKey
  const categoriesServices = useMemo(() => new CategoriesClient({ apiKey, serverUrl }), [apiKey]);

  // State to store categories
  const [categories, setCategories] = useState<ICategory[]>([]);

  // Fetch categories with subcategories and update state
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

  // Event handler for saving a new category
  const handleSaveCategory = useCallback(
    (e: { detail: ISubmitEventData }) => {
      if (userId) {
        const { category, onSuccess } = e.detail;
        const newCategory = new CategoryPayload({ userId, ...category! });
        categoriesServices
          .create(newCategory)
          .then(() => {
            toast.success('Categoria adicionada.');
            getCategories(() => onSuccess());
          })
          .catch(() => {
            toast.error('Um erro ocorreu.');
          });
      }
    },
    [categoriesServices, userId, getCategories]
  );

  // Event handler for saving a new subcategory
  const handleSaveSubcategory = useCallback(
    (e: { detail: ISubmitEventData }) => {
      if (userId) {
        const { category, onSuccess } = e.detail;
        const newCategory = new CategoryPayload({ userId, ...category! });
        categoriesServices
          .create(newCategory)
          .then((_response: Category) => {
            toast.success('Subcategoria adicionada.');
            getCategories(() => onSuccess());
          })
          .catch(() => {
            toast.error('Um erro ocorreu.');
          });
      }
    },
    [categoriesServices, userId, getCategories]
  );

  // Edit category
  const handleEditCategory = useCallback(
    (e: { detail: ISubmitEventData }) => {
      const { category, onSuccess } = e.detail;
      const { id, name, color, parentCategoryId } = category!;
      const editedCategory: ICategoryUpdatePayload = { name, color, parentCategoryId };
      categoriesServices
        .edit(id, editedCategory)
        .then(() => {
          toast.success('Categoria editada.');
          getCategories(() => onSuccess());
        })
        .catch(() => {
          toast.error('Um erro ocorreu.');
        });
    },
    [categoriesServices, getCategories]
  );

  // Edit subcategory
  const handleEditSubCategory = useCallback(
    (e: { detail: ISubmitEventData }) => {
      const { category, onSuccess } = e.detail;
      const { id, name, color, parentCategoryId } = category!;
      const editedCategory: ICategoryUpdatePayload = { name, color, parentCategoryId };
      categoriesServices
        .edit(id, editedCategory)
        .then(() => {
          toast.success('Subcategoria editada.');
          getCategories(() => onSuccess());
        })
        .catch(() => {
          toast.error('Um erro ocorreu.');
        });
    },
    [categoriesServices, getCategories]
  );

  // Delete category
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

  // Delete subcategory
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
    // Show main loading spinner when component mounts or when getCategories function changes
    componentRef.current.showMainLoading = true;
    getCategories(() => {
      // Hide main loading spinner once categories are fetched
      componentRef.current.showMainLoading = false;
    });
  }, [getCategories]);

  useEffect(() => {
    // Update categoriesData property of componentRef with latest categories prop
    componentRef.current.categoriesData = categories;
  }, [componentRef, categories]);

  useEffect(() => {
    // Add event listeners for custom events to componentRef and remove them on cleanup
    const componentRefCurrent = componentRef.current;
    componentRefCurrent.addEventListener('save-new', handleSaveCategory);
    componentRefCurrent.addEventListener('save-new-subcategory', handleSaveSubcategory);
    componentRefCurrent.addEventListener('delete-own-category', handleDeleteCategory);
    componentRefCurrent.addEventListener('delete-own-subcategory', handleDeleteSubCategory);
    componentRefCurrent.addEventListener('edit-category', handleEditCategory);
    componentRefCurrent.addEventListener('edit-subcategory', handleEditSubCategory);

    return () => {
      // Cleanup by removing event listeners from componentRef
      componentRefCurrent.removeEventListener('save-new', handleSaveCategory);
      componentRefCurrent.removeEventListener('save-new-subcategory', handleSaveSubcategory);
      componentRefCurrent.removeEventListener('delete-own-category', handleDeleteCategory);
      componentRefCurrent.removeEventListener('delete-own-subcategory', handleDeleteSubCategory);
      componentRefCurrent.removeEventListener('edit-category', handleEditCategory);
      componentRefCurrent.removeEventListener('edit-subcategory', handleEditSubCategory);
    };
  }, [
    handleSaveCategory,
    handleSaveSubcategory,
    handleDeleteCategory,
    handleDeleteSubCategory,
    handleEditCategory,
    handleEditSubCategory
  ]);

  // Render ob-categories-component with props
  return (
    <ob-categories-component
      alertType="warning" // Prop for alert type, e.g. "warning"
      showAlert={isProcessing} // Prop for showing/hiding alert, based on isProcessing boolean variable
      alertText={alertText} // Prop for alert text to display
      ref={componentRef} // Prop for passing the ref of componentRef to the ob-categories-component
      deleteCategoryDisabled // Prop for disabling delete category functionality
      editCategoryDisabled // Prop for disabling edit category functionality
      editSubcategoryDisabled // Prop for disabling edit subcategory functionality
    />
  );
};

export default CategoriesComponent;
