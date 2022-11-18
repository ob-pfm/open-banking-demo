import IConcept from '../interfaces/IConcept';
import Category from './Category';
export default class Concept {
    amount?: number;
    category: Category;
    id?: string;
    constructor({ amount, category, id }: IConcept);
}
