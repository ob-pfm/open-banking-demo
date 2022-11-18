import React, { FC } from 'react';
import SvgIconProps from '../../assets/SvgIconProps';
interface IProps {
    className?: string;
    disabled?: boolean | undefined;
    handleClick?: () => void;
    id?: string;
    icon: FC<SvgIconProps> | null;
    tooltip?: string;
    style?: React.CSSProperties;
    variant?: 'danger' | 'gray' | undefined;
}
declare const _default: React.NamedExoticComponent<IProps>;
export default _default;
