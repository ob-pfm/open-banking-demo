"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ApiCore = exports.SERVER_URL_SANDBOX = exports.SERVER_URL_PROD = void 0;
const helpers_1 = require("../helpers");
exports.SERVER_URL_PROD = 'https://pfm-api-production.finerioconnect.com';
exports.SERVER_URL_SANDBOX = 'http://localhost:4200/api/v1/';
class ApiCore {
    constructor(apiSettings) {
        this.doGet = (url, success) => new Promise((resolve, reject) => {
            this._apiInstance
                .get(url)
                .then((response) => resolve(success(response.data)))
                .catch((error) => (0, helpers_1.processErrors)(error, reject));
        });
        this.doPost = (url, body, success, isPlainObject) => new Promise((resolve, reject) => {
            this._apiInstance
                .post(url, isPlainObject ? body : body.plainObject)
                .then((response) => resolve(success(response.data)))
                .catch((error) => (0, helpers_1.processErrors)(error, reject));
        });
        this.doPut = (url, body, success, isPlainObject) => new Promise((resolve, reject) => {
            this._apiInstance
                .put(url, isPlainObject ? body : body.plainObject)
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
