import { FC } from 'react';
import BalanceClass from '../../../shared/models/insights/Balance';
interface IProps {
    balances: BalanceClass[];
    cardBalanceChartTitle: string;
    cardBalanceTitle: string;
    cardBalanceIncomeTitle: string;
    cardBalanceExpenseTitle: string;
    barChartColorIncome: string;
    barChartColorSelectedIncome: string;
    barChartColorExpense: string;
    barChartColorSelectedExpense: string;
}
declare const Balance: FC<IProps>;
export default Balance;
