import React, { FC } from 'react';
interface IProps {
    children: React.ReactNode;
    className?: string;
    onCloseModal?: () => void;
    beforeOpen?: () => void;
    afterOpen?: () => void;
    beforeClose?: () => void;
    afterClose?: () => void;
    backAction?: () => void;
    fontFamily?: string;
    fullHeight?: boolean;
    isOpen: boolean;
    isSecondModal?: boolean;
    title?: string;
    titleClass?: string;
    titleStyle?: React.CSSProperties;
    showBack?: boolean;
}
declare const Modal: FC<IProps>;
export default Modal;
