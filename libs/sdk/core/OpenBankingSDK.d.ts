import { Arg, CollectionDictionary } from './types';
export default class OpenBankingSDK {
    private _collectionsIncluded;
    private _apiKey;
    private _serverUrl;
    private _sandbox?;
    private _apiInstance?;
    private _headers;
    constructor(arg: Arg);
    connect(apiKey: string): CollectionDictionary;
    private getCollectionsIncluded;
    get apiKey(): string;
    get serverUrl(): string;
}
