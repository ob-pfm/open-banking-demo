import { ApiCore } from '../api';
export default class Client {
    protected _serverUrl: string;
    private _sandbox;
    protected _apiCore: ApiCore;
    private _headers;
    constructor(apiKey: string, sandbox?: boolean);
    get serverUrl(): string;
}
