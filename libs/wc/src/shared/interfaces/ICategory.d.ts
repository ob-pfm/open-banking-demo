export default interface ICategory {
    id: number;
    name: string;
    color: string;
    parentCategoryId: number | null;
    userId: number | null;
    dateCreated: number | null;
    lastUpdated: number | null;
    subcategories?: ICategory[];
}
