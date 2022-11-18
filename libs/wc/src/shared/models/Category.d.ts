import ICategory from '../interfaces/ICategory';
export default class Category implements ICategory {
    private _id;
    private _name;
    private _color;
    private _parentCategoryId;
    private _userId;
    private _dateCreated;
    private _lastUpdated;
    private _subcategories?;
    constructor({ id, name, color, parentCategoryId, userId, dateCreated, lastUpdated, subcategories }: ICategory);
    get id(): number;
    get name(): string;
    get color(): string;
    get parentCategoryId(): number | null;
    get userId(): number | null;
    get dateCreated(): number | null;
    get lastUpdated(): number | null;
    get subcategories(): Category[] | undefined;
}
