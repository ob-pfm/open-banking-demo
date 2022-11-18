import { FC } from 'react';
export default interface ISelectOption {
    value: string;
    label: string;
    color?: string;
    icon?: FC;
}
