import ICategory from '../interfaces/ICategory';
import { PlainObject } from '../types';
export default class Category implements ICategory {
    private _id;
    private _name;
    private _color;
    private _imagePath;
    private _parentCategoryId;
    private _userId;
    private _dateCreated;
    private _lastUpdated;
    constructor({ id, name, color, imagePath, parentCategoryId, userId, dateCreated, lastUpdated }: ICategory);
    get id(): number;
    get name(): string;
    get color(): string;
    get imagePath(): string;
    get parentCategoryId(): number;
    get userId(): number;
    get dateCreated(): string;
    get lastUpdated(): string;
    getPlainObject(): PlainObject;
}
