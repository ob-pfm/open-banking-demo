import { CSSProperties } from 'react';
export declare type ToastTrigger = (variant: 'error' | 'success', message: string) => void;
export declare type Dictionary = {
    [key: string]: string;
};
export declare type TStyles = string | string[] | CSSProperties | CSSProperties[];
