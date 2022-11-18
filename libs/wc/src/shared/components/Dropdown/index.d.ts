import React, { FC } from 'react';
import ISelectOption from '../../interfaces/ISelectOption';
interface IProps {
    className?: string;
    disabled?: boolean;
    handleChange: (newValue: string, name: string) => void;
    label?: string;
    name: string;
    options: ISelectOption[];
    placeholder?: string;
    rightAlign?: boolean;
    style?: React.CSSProperties;
    value?: string;
}
declare const StyledDropdown: FC<IProps>;
export default StyledDropdown;
