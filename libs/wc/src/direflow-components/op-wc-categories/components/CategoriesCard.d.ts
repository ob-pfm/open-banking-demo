import React, { FC } from 'react';
import Category from '../../../shared/models/Category';
import { IModalCatRef } from '../interfaces/IModalCatRef';
export declare const PREFIX_CLASS: string;
interface IProps {
    categories: Category[];
    className: string;
    id: string;
    title?: string;
    buttonText: string;
    modalRef: React.RefObject<IModalCatRef>;
}
declare const CategoriesCard: FC<IProps>;
export default CategoriesCard;
