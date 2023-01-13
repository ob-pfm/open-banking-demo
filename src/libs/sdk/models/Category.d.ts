import ICategory from '../interfaces/ICategory';
export default class Category implements ICategory {
    protected _id: number;
    protected _name: string;
    protected _color: string;
    protected _imagePath: string;
    protected _parentCategoryId: number;
    protected _userId: number;
    protected _dateCreated: string;
    protected _lastUpdated: string;
    constructor({ id, name, color, imagePath, parentCategoryId, userId, dateCreated, lastUpdated }: ICategory);
    get id(): number;
    get name(): string;
    get color(): string;
    get imagePath(): string;
    get parentCategoryId(): number;
    get userId(): number;
    get dateCreated(): string;
    get lastUpdated(): string;
    toObject(): ICategory;
}
