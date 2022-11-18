import { FC } from 'react';
interface IProps {
    className?: string;
    text: string;
    variant?: 'warning' | 'danger' | 'success';
}
declare const Alert: FC<IProps>;
export default Alert;
