import Category from '../../../shared/models/Category';
export interface IModalCatRef {
    showModalCategory: (category: Category) => void;
    showModalNewCategory: () => void;
    showModalNewSubCategory: (category: Category) => void;
}
