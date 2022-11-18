import { FC } from 'react';
import Category from '../../../shared/models/Category';
import { ToastTrigger } from '../../../shared/types';
export declare const PREFIX_CLASS: string;
interface IProps {
    className: string;
    labelNameInput: string;
    labelColorPicker: string;
    textButton: string;
    category?: Category | null;
    handleCloseModal: () => void;
    showToast: ToastTrigger;
}
declare const NewCategory: FC<IProps>;
export default NewCategory;
