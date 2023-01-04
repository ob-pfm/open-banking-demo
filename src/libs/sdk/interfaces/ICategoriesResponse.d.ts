import ICategory from './ICategory';
export default interface ICategoriesResponse {
    data: ICategory[];
    nextCursor?: number;
}
