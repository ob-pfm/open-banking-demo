import { Account, FinancialEntity } from '../../../shared/models';
import IResponseError from '../../../shared/interfaces/IResponseError';
import { IFormValues } from '../interfaces';
declare type ListState = {
    fetchAccountsErrors: IResponseError[];
    fetchFinancialEntitiesErrors: IResponseError[];
    formValues: IFormValues;
    isFetchingAccounts: boolean;
    isFetchingFinancialEntities: boolean;
    isModalOpen: boolean;
    accountsData: Account[];
    financialEntitiesData: FinancialEntity[];
};
export type { ListState };
