import IConsentCreateResponse from '../interfaces/IConsentCreateResponse';
export default class ConsentCreateResponse implements IConsentCreateResponse {
    private _bankId;
    private _userId;
    private _url;
    constructor({ bankId, userId, url }: IConsentCreateResponse);
    get bankId(): string;
    get userId(): number;
    get url(): string;
    toObject(): IConsentCreateResponse;
}
