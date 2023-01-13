import IConsumeConsentResponse from '../interfaces/IConsumeConsentResponse';
export default class ConsumeConsentResponse implements IConsumeConsentResponse {
    private _authCode;
    private _token;
    private _state;
    constructor({ authCode, token, state }: IConsumeConsentResponse);
    get authCode(): string;
    get token(): string;
    get state(): string;
    toObject(): IConsumeConsentResponse;
}
