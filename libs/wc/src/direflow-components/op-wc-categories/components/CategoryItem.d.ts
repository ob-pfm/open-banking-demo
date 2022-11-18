import React, { FC } from 'react';
import Category from '../../../shared/models/Category';
import { IModalCatRef } from '../interfaces/IModalCatRef';
export declare const PREFIX_CLASS: string;
interface IProps {
    category: Category;
    buttonText: string;
    modalRef: React.RefObject<IModalCatRef>;
}
declare const CategoryItem: FC<IProps>;
export default CategoryItem;
