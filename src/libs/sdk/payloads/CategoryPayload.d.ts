import { PlainObject } from '../types';
interface ICategoryPayload {
    userId?: number;
    name: string;
    color: string;
    parentCategoryId: number;
}
export default class CategoryPayload {
    private _userId?;
    private _name;
    private _color;
    private _parentCategoryId;
    constructor({ userId, name, color, parentCategoryId }: ICategoryPayload);
    get userId(): number | undefined;
    set userId(value: number | undefined);
    get name(): string;
    set name(value: string);
    get color(): string;
    set color(value: string);
    get parentCategoryId(): number;
    set parentCategoryId(value: number);
    get plainObject(): PlainObject;
}
export {};
