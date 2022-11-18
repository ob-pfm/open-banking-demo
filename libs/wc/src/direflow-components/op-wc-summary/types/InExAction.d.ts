import IncomeExpense from '../../../shared/models/insights/IncomeExpense';
import { InExState } from './InExState';
declare enum InExActionType {
    SET_INDEX = "SET_INDEX",
    SET_SUBINDEX = "SET_SUBINDEX",
    SET_ARR = "SET_ARR",
    SET_STATE = "SET_STATE"
}
declare type InExAction = {
    type: InExActionType.SET_INDEX;
    payload: number;
} | {
    type: InExActionType.SET_SUBINDEX;
    payload: number | null;
} | {
    type: InExActionType.SET_ARR;
    payload: IncomeExpense[];
} | {
    type: InExActionType.SET_STATE;
    payload: InExState;
};
export type { InExAction };
export { InExActionType };
