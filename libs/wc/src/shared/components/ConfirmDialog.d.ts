import { FC } from 'react';
interface IProps {
    className?: string;
    onCloseModal?: () => void;
    onConfirm?: () => void;
    beforeOpen?: () => void;
    afterOpen?: () => void;
    beforeClose?: () => void;
    afterClose?: () => void;
    fontFamily?: string;
    isDeleteConfirm?: boolean;
    isOpen: boolean;
    message?: string;
    negativeButtonText: string;
    positiveButtonText: string;
    title?: string;
}
declare const ConfirmDialog: FC<IProps>;
export default ConfirmDialog;
