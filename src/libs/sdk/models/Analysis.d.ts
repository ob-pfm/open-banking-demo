import ICategoryInsights from '../interfaces/ICategoryInsights';
import IAnalysis from '../interfaces/IAnalysis';
export default class Analysis implements IAnalysis {
    private _date;
    private _categories;
    constructor({ date, categories }: IAnalysis);
    get date(): number;
    get categories(): ICategoryInsights[];
}
