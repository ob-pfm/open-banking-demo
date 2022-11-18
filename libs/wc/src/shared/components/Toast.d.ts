import React, { FC } from 'react';
interface IProps {
    children: React.ReactNode;
    className?: string;
    beforeOpen?: () => void;
    afterOpen?: () => void;
    beforeClose?: () => void;
    afterClose?: () => void;
    fontFamily?: string;
    isOpen: boolean;
    handleIsOpen: (boolean: any) => void;
    variant?: string;
    closetime?: number;
}
declare const Toast: FC<IProps>;
export default Toast;
