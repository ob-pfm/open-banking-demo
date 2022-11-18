import Subcategory from '../../../shared/models/insights/Subcategory';
export interface IModalAnalysis {
    showModal: (name: string, subcategories: Subcategory[], isIncome: boolean) => void;
}
