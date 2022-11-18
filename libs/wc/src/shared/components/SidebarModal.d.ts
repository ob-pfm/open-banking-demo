import React, { FC, ReactNode } from 'react';
interface IProps {
    children: ReactNode;
    className?: string;
    onCloseModal?: () => void;
    beforeOpen?: () => void;
    afterOpen?: () => void;
    beforeClose?: () => void;
    afterClose?: () => void;
    fontFamily?: string;
    hideHeader?: boolean;
    isOpen: boolean;
    isSecondModal?: boolean;
    title?: string;
    titleClass?: string;
    titleStyle?: React.CSSProperties;
    showBack?: boolean;
    backAction?: () => void;
}
declare const SidebarModal: FC<IProps>;
export default SidebarModal;
