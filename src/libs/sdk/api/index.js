"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ApiCore = exports.SERVER_URL_SANDBOX = exports.SERVER_URL_PROD = void 0;
const helpers_1 = require("../helpers");
exports.SERVER_URL_PROD = 'http://ec2-3-21-18-54.us-east-2.compute.amazonaws.com:8081/api/v1/';
exports.SERVER_URL_SANDBOX = 'http://ec2-3-21-18-54.us-east-2.compute.amazonaws.com:8081/api/v1/';
class ApiCore {
    constructor(apiSettings) {
        this.doGet = (url, success) => new Promise((resolve, reject) => {
            this._apiInstance
                .get(url)
                .then((response) => resolve(success(response.data)))
                .catch((error) => (0, helpers_1.processErrors)(error, reject));
        });
        this.doPost = (url, body, success) => new Promise((resolve, reject) => {
            this._apiInstance
                .post(url, body)
                .then((response) => resolve(success(response.data)))
                .catch((error) => (0, helpers_1.processErrors)(error, reject));
        });
        this.doPut = (url, body, success) => new Promise((resolve, reject) => {
            this._apiInstance
                .put(url, body)
                .then((response) => resolve(success(response.data)))
                .catch((error) => (0, helpers_1.processErrors)(error, reject));
        });
        this.doDelete = (url) => new Promise((resolve, reject) => {
            this._apiInstance
                .delete(url)
                .then(() => resolve(true))
                .catch((error) => (0, helpers_1.processErrors)(error, reject));
        });
        this._apiInstance = apiSettings;
    }
    get serverUrl() {
        return this._apiInstance.defaults.baseURL || '';
    }
}
exports.ApiCore = ApiCore;
