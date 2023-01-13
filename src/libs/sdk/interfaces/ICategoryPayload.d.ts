export default interface ICategoryPayload {
    userId?: number;
    name: string;
    color?: string;
    parentCategoryId?: number | null;
}
