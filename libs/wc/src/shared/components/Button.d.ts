import React, { FC } from 'react';
interface IProps {
    className?: string;
    disabled?: boolean | undefined;
    handleClick?: (event?: any) => void;
    id?: string;
    style?: React.CSSProperties;
    text: string;
    type?: 'button' | 'submit' | 'reset' | undefined;
    variant?: 'danger' | 'danger-outline' | 'light' | 'outline' | 'rounded' | 'solid' | 'light-black' | undefined;
}
declare const Button: FC<IProps>;
export default Button;
