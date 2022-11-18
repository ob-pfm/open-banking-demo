import React, { Dispatch } from 'react';
import { InExAction } from '../types/InExAction';
import { InExState } from '../types/InExState';
import { IModalAnalysis } from './IModalAnalysis';
export interface IIncomeExpenseProps {
    inexState: InExState;
    inexDispatch: Dispatch<InExAction>;
    type: string;
    cardBarChartTitle: string;
    cardDonChartTitle: string;
    categoryTableTitle: string;
    subcategoryTableTitle: string;
    cardTotalTitle: string;
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
    barChartColor: string;
    barChartColorSelected: string;
    modalRef: React.RefObject<IModalAnalysis>;
    prefixClass: string;
}
