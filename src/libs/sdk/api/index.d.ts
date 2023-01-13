import { AxiosInstance } from 'axios';
export declare const SERVER_URL_PROD = "http://tecbantest@ec2-3-21-18-54.us-east-2.compute.amazonaws.com:8081/api/v1/";
export declare const SERVER_URL_SANDBOX: string;
export declare class ApiCore {
    private _apiInstance;
    constructor(apiSettings: AxiosInstance);
    doGet: (url: string, success: (response: any) => any) => Promise<any>;
    doPost: (url: string, body: any, success: (response: any) => any) => Promise<any>;
    doPut: (url: string, body: any, success: (response: any) => any) => Promise<any>;
    doDelete: (url: string) => Promise<any>;
    get serverUrl(): string;
}
