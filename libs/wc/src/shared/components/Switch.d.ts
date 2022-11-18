import { FC } from 'react';
interface IProps {
    className?: string;
    checked: boolean;
    disabled?: boolean;
    handleChange: (newValue: any, name: string) => void;
    id?: string;
    name: string;
}
declare const Switch: FC<IProps>;
export default Switch;
