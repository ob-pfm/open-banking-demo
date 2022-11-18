import { FC, Dispatch, SetStateAction } from 'react';
import { InExAction } from '../types/InExAction';
import { InExState } from '../types/InExState';
import Balance from '../../../shared/models/insights/Balance';
interface IProps {
    id: string;
    prefixClass: string;
    title: string;
    type: string;
    data: number[][];
    labels: string[];
    index: number;
    barChartColor: string[];
    barChartColorSelected: string[];
    dispatchIndex?: Dispatch<InExAction>;
    setIndex?: Dispatch<SetStateAction<number>>;
    inexState?: InExState;
    balances?: Balance[];
}
declare const CardChart: FC<IProps>;
export default CardChart;
