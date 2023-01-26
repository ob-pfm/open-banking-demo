import { ApiCore } from '../api';
export default class Client {
    protected _serverUrl: string;
    protected _apiCore: ApiCore;
    protected _apiKey: string;
    private _headers;
    constructor(apiKey: string, serverUrl?: string);
    get serverUrl(): string;
}
