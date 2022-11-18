import { FC } from 'react';
interface IProps {
    id: string;
    type: string;
    title: string;
    quantity: number;
    prefixClass: string;
}
declare const CardInfo: FC<IProps>;
export default CardInfo;
