import { AxiosInstance } from 'axios';
export declare const SERVER_URL_PROD = "https://pfm-api-production.finerioconnect.com";
export declare const SERVER_URL_SANDBOX = "http://localhost:4200/api/v1/";
export declare class ApiCore {
    private _apiInstance;
    constructor(apiSettings: AxiosInstance);
    doGet: (url: string, success: (response: any) => any) => Promise<any>;
    doPost: (url: string, body: any, success: (response: any) => any, isPlainObject?: boolean) => Promise<any>;
    doPut: (url: string, body: any, success: (response: any) => any, isPlainObject?: boolean) => Promise<any>;
    doDelete: (url: string) => Promise<any>;
    get serverUrl(): string;
}
