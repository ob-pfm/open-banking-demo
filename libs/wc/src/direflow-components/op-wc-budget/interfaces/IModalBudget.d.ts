import Budget from '../../../shared/models/Budget';
export interface IModalBudget {
    showModal: (budget?: Budget, edit?: boolean) => void;
}
