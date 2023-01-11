import IResourceDetailResponse from '../interfaces/IResourceDetailResponse';
export default class ResourceDetailResponse implements IResourceDetailResponse {
    private _bankId;
    private _userId;
    private _resources;
    constructor({ bankId, userId, resources }: IResourceDetailResponse);
    get bankId(): string;
    get userId(): number;
    get resources(): string[];
    toObject(): IResourceDetailResponse;
}
