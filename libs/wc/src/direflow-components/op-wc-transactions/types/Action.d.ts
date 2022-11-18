import IAccount from '../../../shared/interfaces/IAccount';
import ICategory from '../../../shared/interfaces/ICategory';
import ITransaction from '../../../shared/interfaces/ITransaction';
import IResponseError from '../../../shared/interfaces/IResponseError';
declare enum ActionType {
    FETCH_ACCOUNTS = "FETCH_ACCOUNTS",
    FETCH_ACCOUNTS_ERROR = "FETCH_ACCOUNTS_ERROR",
    FETCH_ACCOUNTS_SUCCESS = "FETCH_ACCOUNTS_SUCCESS",
    FETCH_CATEGORIES = "FETCH_CATEGORIES",
    FETCH_CATEGORIES_ERROR = "FETCH_CATEGORIES_ERROR",
    FETCH_CATEGORIES_SUCCESS = "FETCH_CATEGORIES_SUCCESS",
    FETCH_TRANSACTIONS = "FETCH_TRANSACTIONS",
    FETCH_TRANSACTIONS_ERROR = "FETCH_TRANSACTIONS_ERROR",
    FETCH_TRANSACTIONS_SUCCESS = "FETCH_TRANSACTIONS_SUCCESS",
    INITIALIZE_FILTER_FORM = "INITIALIZE_FILTER_FORM",
    INITIALIZE_FORM = "INITIALIZE_FORM",
    RESET = "RESET",
    RESET_FILTER_FORM = "RESET_FILTER_FORM",
    RESET_FORM = "RESET_FORM",
    SET_CURRENT_FILTER_VALUES = "SET_CURRENT_FILTER_VALUES",
    SET_FILTER_FORM_DATA = "SET_FILTER_FORM_DATA",
    SET_FILTER_FORM_FIELD = "SET_FILTER_FORM_FIELD",
    SET_FILTER_MODAL_IS_OPEN = "SET_FILTER_MODAL_IS_OPEN",
    SET_FORM_DATA = "SET_FORM_DATA",
    SET_FORM_FIELD = "SET_FORM_FIELD",
    SET_MODAL_IS_OPEN = "SET_MODAL_IS_OPEN"
}
declare type Action = {
    type: ActionType.FETCH_ACCOUNTS;
    payload?: any;
} | {
    type: ActionType.FETCH_ACCOUNTS_ERROR;
    payload: IResponseError[];
} | {
    type: ActionType.FETCH_ACCOUNTS_SUCCESS;
    payload: IAccount[];
} | {
    type: ActionType.FETCH_CATEGORIES;
    payload?: any;
} | {
    type: ActionType.FETCH_CATEGORIES_ERROR;
    payload: IResponseError[];
} | {
    type: ActionType.FETCH_CATEGORIES_SUCCESS;
    payload: ICategory[];
} | {
    type: ActionType.FETCH_TRANSACTIONS;
    payload?: any;
} | {
    type: ActionType.FETCH_TRANSACTIONS_ERROR;
    payload: IResponseError[];
} | {
    type: ActionType.FETCH_TRANSACTIONS_SUCCESS;
    payload: ITransaction[];
} | {
    type: ActionType.INITIALIZE_FILTER_FORM;
    payload?: any;
} | {
    type: ActionType.INITIALIZE_FORM;
    payload?: object;
} | {
    type: ActionType.RESET;
    payload?: any;
} | {
    type: ActionType.RESET_FILTER_FORM;
    payload?: any;
} | {
    type: ActionType.RESET_FORM;
    payload?: any;
} | {
    type: ActionType.SET_CURRENT_FILTER_VALUES;
    payload?: any;
} | {
    type: ActionType.SET_FILTER_FORM_DATA;
    payload: object;
} | {
    type: ActionType.SET_FILTER_FORM_FIELD;
    payload: {
        newValue: any;
        name: string;
    };
} | {
    type: ActionType.SET_FILTER_MODAL_IS_OPEN;
    payload: boolean;
} | {
    type: ActionType.SET_FORM_DATA;
    payload: object;
} | {
    type: ActionType.SET_FORM_FIELD;
    payload: {
        newValue: any;
        name: string;
    };
} | {
    type: ActionType.SET_MODAL_IS_OPEN;
    payload: boolean;
};
export type { Action };
export { ActionType };
