import IAccount from '../../../shared/interfaces/IAccount';
import IFinancialEntity from '../../../shared/interfaces/IFinancialEntity';
import IResponseError from '../../../shared/interfaces/IResponseError';
declare enum ListActionType {
    FETCH_ACCOUNTS = "FETCH_ACCOUNTS",
    FETCH_ACCOUNTS_ERROR = "FETCH_ACCOUNTS_ERROR",
    FETCH_ACCOUNTS_SUCCESS = "FETCH_ACCOUNTS_SUCCESS",
    FETCH_FINANTIAL_ENTITIES = "FETCH_FINANTIAL_ENTITIES",
    FETCH_FINANTIAL_ENTITIES_ERROR = "FETCH_FINANTIAL_ENTITIES_ERROR",
    FETCH_FINANTIAL_ENTITIES_SUCCESS = "FETCH_FINANTIAL_ENTITIES_SUCCESS",
    INITIALIZE_FORM = "INITIALIZE_FORM",
    RESET = "RESET",
    RESET_FORM = "RESET_FORM",
    SET_FORM_DATA = "SET_FORM_DATA",
    SET_FORM_FIELD = "SET_FORM_FIELD",
    SET_MODAL_IS_OPEN = "SET_MODAL_IS_OPEN"
}
declare type ListAction = {
    type: ListActionType.FETCH_ACCOUNTS;
    payload?: unknown;
} | {
    type: ListActionType.FETCH_ACCOUNTS_ERROR;
    payload: IResponseError[];
} | {
    type: ListActionType.FETCH_ACCOUNTS_SUCCESS;
    payload: IAccount[];
} | {
    type: ListActionType.FETCH_FINANTIAL_ENTITIES;
    payload?: unknown;
} | {
    type: ListActionType.FETCH_FINANTIAL_ENTITIES_ERROR;
    payload: IResponseError[];
} | {
    type: ListActionType.FETCH_FINANTIAL_ENTITIES_SUCCESS;
    payload: IFinancialEntity[];
} | {
    type: ListActionType.INITIALIZE_FORM;
    payload?: object;
} | {
    type: ListActionType.RESET;
    payload?: unknown;
} | {
    type: ListActionType.RESET_FORM;
    payload?: unknown;
} | {
    type: ListActionType.SET_FORM_DATA;
    payload: object;
} | {
    type: ListActionType.SET_FORM_FIELD;
    payload: {
        newValue: unknown;
        name: string;
    };
} | {
    type: ListActionType.SET_MODAL_IS_OPEN;
    payload: boolean;
};
export { ListActionType };
export type { ListAction };
