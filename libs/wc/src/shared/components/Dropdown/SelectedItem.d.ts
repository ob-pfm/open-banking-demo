import React, { FC } from 'react';
import ISelectOption from '../../interfaces/ISelectOption';
interface IProps {
    clickable?: boolean;
    disabled?: boolean;
    handleClick: (e: any) => void;
    placeholder?: string;
    selectedValue?: ISelectOption;
    style?: React.CSSProperties;
}
declare const SelectedItem: FC<IProps>;
export default SelectedItem;
