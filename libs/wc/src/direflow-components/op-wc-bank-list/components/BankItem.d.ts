import { FC } from 'react';
interface IProps {
    handleClick: () => void;
    imagePath?: string;
    name?: string;
}
declare const BankItem: FC<IProps>;
export default BankItem;
