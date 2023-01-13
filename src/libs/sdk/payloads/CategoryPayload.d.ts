import ICategoryPayload from '../interfaces/ICategoryPayload';
export default class CategoryPayload implements ICategoryPayload {
    private _userId?;
    private _name;
    private _color?;
    private _parentCategoryId?;
    constructor({ userId, name, color, parentCategoryId }: ICategoryPayload);
    get userId(): number | undefined;
    set userId(value: number | undefined);
    get name(): string;
    set name(value: string);
    get color(): string | undefined;
    set color(value: string | undefined);
    get parentCategoryId(): number | null | undefined;
    set parentCategoryId(value: number | null | undefined);
    toObject(): ICategoryPayload;
}
