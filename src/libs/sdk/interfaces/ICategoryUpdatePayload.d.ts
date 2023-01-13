export default interface ICategoryUpdatePayload {
    name?: string;
    color?: string;
    parentCategoryId?: number | null;
}
