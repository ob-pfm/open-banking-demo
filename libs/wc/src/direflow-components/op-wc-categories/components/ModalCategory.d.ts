import React from 'react';
import { ToastTrigger } from '../../../shared/types';
import { IModalCatRef } from '../interfaces/IModalCatRef';
interface IProps {
    className: string;
    deleteCategoryDisabled: boolean;
    deleteCategoryButtonText: string;
    deleteOwnCategoryDisabled: boolean;
    deleteOwnCategoryButtonText: string;
    modalRef: React.RefObject<IModalCatRef>;
    newCategoryModalButtonText: string;
    newCategoryModalInputColorPickerLabel: string;
    newCategoryModalInputLabel: string;
    newCategoryModalTitle: string;
    detailsCategoryModalTitle: string;
    detailsCategoryModalButtonText: string;
    detailsCategoryModalSubCategoryText: string;
    newSubCategoryModalButtonText: string;
    newSubCategoryModalInputColorPickerLabel: string;
    newSubCategoryModalInputLabel: string;
    newSubCategoryModalTitle: string;
    confirmDeleteDialogTitle: string;
    confirmDeleteDialogMessage: string;
    confirmDeleteDialogNegativeButtonText: string;
    confirmDeleteDialogPositiveButtonText: string;
    showToast: ToastTrigger;
}
declare const ModalCategory: React.ForwardRefExoticComponent<IProps & React.RefAttributes<IModalCatRef>>;
export default ModalCategory;
