import React, { FC } from 'react';
interface IProps {
    align?: string;
    className?: string;
    checked: boolean;
    disabled?: boolean;
    handleChange: (newValue: any, name?: string) => void;
    id?: string;
    label?: string;
    name?: string;
    style?: React.CSSProperties;
}
declare const Checkbox: FC<IProps>;
export default Checkbox;
