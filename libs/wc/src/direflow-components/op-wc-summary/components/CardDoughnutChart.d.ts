import { FC, Dispatch } from 'react';
import Category from '../../../shared/models/insights/Category';
import { InExAction } from '../types/InExAction';
import { InExState } from '../types/InExState';
interface IProps {
    id: string;
    prefixClass: string;
    dispatchState: Dispatch<InExAction>;
    data: number[];
    labels: string[];
    colors: string[];
    isSubcategory: boolean;
    categories: Category[];
    catid: string | undefined;
    title: string;
    inexState?: InExState;
    userId: number | null;
}
declare const CardDoughnutChart: FC<IProps>;
export default CardDoughnutChart;
