import ITransaction from './ITransaction';
import ISubategoryInsights from './ISubategoryInsights';
export default interface ICategoryInsights {
    categoryId: number;
    amount: number;
    average?: number;
    quantity?: number;
    subcategories?: ISubategoryInsights[];
    transactions?: ITransaction[];
}
