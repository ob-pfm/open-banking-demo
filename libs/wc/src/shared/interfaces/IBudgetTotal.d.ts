import { IBudget } from './IBudget';
export interface IBudgetTotal {
    data: IBudget[];
    nextCursor: number | null;
}
