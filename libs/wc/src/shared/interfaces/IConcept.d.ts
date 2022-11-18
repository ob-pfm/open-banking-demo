import ICategory from './ICategory';
export default interface IConcept {
    amount?: number;
    description?: string;
    id?: string;
    transaction?: Record<string, unknown>;
    type?: string;
    category: ICategory;
}
