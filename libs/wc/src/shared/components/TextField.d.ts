import React, { FC } from 'react';
interface IProps {
    className?: string;
    disabled?: boolean;
    handleChange: (newValue: string, name: string) => void;
    label?: string;
    min?: string;
    max?: string;
    name: string;
    style?: React.CSSProperties;
    type?: string;
    value: string;
    appendIcon?: FC;
    placeholder?: string;
}
declare const TextField: FC<IProps>;
export default TextField;
