import React from 'react';
import { IModalAnalysis } from '../interfaces/IModalAnalysis';
interface IProps {
    analysisExpensesTableAverageTitle: string;
    analysisExpensesTableDescrTitle: string;
    analysisExpensesTableNumTranTitle: string;
    analysisExpensesTableSubTitle: string;
    analysisExpensesTableTitle: string;
    analysisExpensesTableTotalTitle: string;
    analysisIncomesTableAmountTitle: string;
    analysisIncomesTableCategoryTitle: string;
    analysisIncomesTableConceptTitle: string;
    analysisIncomesTableDateTitle: string;
    analysisIncomesTableSubTitle: string;
    analysisIncomesTableTitle: string;
}
declare const ModalDetailTable: React.ForwardRefExoticComponent<IProps & React.RefAttributes<IModalAnalysis>>;
export default ModalDetailTable;
