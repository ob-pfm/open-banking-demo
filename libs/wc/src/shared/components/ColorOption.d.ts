import React, { FC } from 'react';
export declare const PREFIX_CLASS: string;
declare const ColorOption: FC<{
    color: string;
    width: string;
    className: string;
    style?: React.CSSProperties;
    index?: number;
    setState?: (number: any) => void;
    shadow?: boolean;
    selected?: boolean;
    clickable?: boolean;
}>;
export default ColorOption;
