import React, { FC } from 'react';
import Category from '../../../shared/models/Category';
import { IModalCatRef } from '../interfaces/IModalCatRef';
export declare const PREFIX_CLASS: string;
interface IProps {
    className?: string;
    category: Category | null;
    deleteCategoryDisabled: boolean;
    deleteCategoryButtonText: string;
    deleteOwnCategoryDisabled: boolean;
    deleteOwnCategoryButtonText: string;
    handleDelete: () => void;
    modalRef: React.RefObject<IModalCatRef>;
    textButton: string;
    subcategoryText: string;
}
declare const CategoryDetail: FC<IProps>;
export default CategoryDetail;
