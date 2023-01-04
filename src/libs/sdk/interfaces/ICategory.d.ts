export default interface ICategory {
    id: number;
    name: string;
    color: string;
    imagePath: string;
    parentCategoryId: number;
    userId: number;
    dateCreated: string;
    lastUpdated: string;
}
