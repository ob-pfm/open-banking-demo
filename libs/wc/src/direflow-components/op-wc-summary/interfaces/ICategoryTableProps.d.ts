import { Dispatch } from 'react';
import Category from '../../../shared/models/insights/Category';
import { InExAction } from '../types/InExAction';
import { IModalAnalysis } from './IModalAnalysis';
export interface ICategoryTableProps {
    id: string;
    prefixClass: string;
    categories: Category[];
    subIndex: number | null;
    dispatchState: Dispatch<InExAction>;
    type: string;
    subcategoryTableTitle: string;
    categoryTableTitle: string;
    tooltipAnalysis: string;
    tooltipTransactions: string;
    catColTitleCon: string;
    catColTitleAm: string;
    catColTitlePer: string;
    catColTitleDet: string;
    subcatColTitleCon: string;
    subcatColTitleAm: string;
    subcatColTitlePer: string;
    subcatColTitleDet: string;
    modalRef: React.RefObject<IModalAnalysis>;
    date: number | Date;
}
