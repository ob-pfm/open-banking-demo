"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const axios_1 = __importDefault(require("axios"));
const constants_1 = require("../constants");
const collections_1 = require("../collections");
class OpenBankingSDK {
    constructor(arg) {
        this.getCollectionsIncluded = (arg) => {
            if (arg) {
                if (Array.isArray(arg)) {
                    return arg;
                }
                if (typeof arg === 'string') {
                    return [arg];
                }
            }
            return [];
        };
        this._apiKey = '';
        this._headers = {};
        this._collectionsIncluded = [];
        this._sandbox = false;
        if (arg) {
            if (Array.isArray(arg) || typeof arg === 'string') {
                this._collectionsIncluded = this.getCollectionsIncluded(arg);
                this._sandbox = false;
            }
            else if (typeof arg === 'object') {
                if (arg.includes) {
                    this._collectionsIncluded = this.getCollectionsIncluded(arg.includes);
                }
                if (arg.sandbox) {
                    this._sandbox = arg.sandbox;
                }
            }
        }
        this._serverUrl = this._sandbox ? constants_1.SERVER_URL_SANDBOX : constants_1.SERVER_URL_PROD;
    }
    connect(apiKey) {
        this._apiKey = apiKey;
        this._headers = Object.assign(Object.assign({}, this._headers), { 'X-api-key': apiKey });
        this._apiInstance = axios_1.default.create({
            baseURL: this._serverUrl,
            headers: Object.assign({}, this._headers)
        });
        if (this._collectionsIncluded.length) {
            return this._collectionsIncluded.reduce((acc, current) => {
                switch (current) {
                    case constants_1.ACCOUNTS_TYPE:
                        return Object.assign(Object.assign({}, acc), { Accounts: this._apiInstance && new collections_1.Accounts(this._apiInstance) });
                    case constants_1.BANKS_TYPE:
                        return Object.assign(Object.assign({}, acc), { Banks: this._apiInstance && new collections_1.Banks(this._apiInstance) });
                    case constants_1.TRANSACTIONS_TYPE:
                        return Object.assign(Object.assign({}, acc), { Transactions: this._apiInstance && new collections_1.Transactions(this._apiInstance) });
                    case constants_1.USERS_TYPE:
                        return Object.assign(Object.assign({}, acc), { Users: this._apiInstance && new collections_1.Users(this._apiInstance) });
                    default:
                        return acc;
                }
            }, {});
        }
        return {
            Accounts: new collections_1.Accounts(this._apiInstance),
            Banks: new collections_1.Banks(this._apiInstance),
            Transactions: new collections_1.Transactions(this._apiInstance),
            Users: new collections_1.Users(this._apiInstance)
        };
    }
    get apiKey() {
        return this._apiKey;
    }
    get serverUrl() {
        return this._serverUrl;
    }
}
exports.default = OpenBankingSDK;
