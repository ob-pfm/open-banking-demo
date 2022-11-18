import React, { FC } from 'react';
import ISelectOption from '../interfaces/ISelectOption';
interface IProps {
    className?: string;
    disabled?: boolean;
    handleChange: (newValue: string, name: string) => void;
    label?: string;
    name: string;
    options: ISelectOption[];
    style?: React.CSSProperties;
    value: string;
}
declare const OptionsField: FC<IProps>;
export default OptionsField;
