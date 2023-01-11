"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const axios_1 = __importDefault(require("axios"));
const api_1 = require("../api");
const api_2 = require("../api");
class Client {
    constructor(apiKey, sandbox) {
        this._headers = { 'X-api-key': apiKey };
        this._sandbox = sandbox || false;
        this._serverUrl = this._sandbox ? api_2.SERVER_URL_SANDBOX : api_2.SERVER_URL_PROD;
        this._apiCore = new api_1.ApiCore(axios_1.default.create({
            baseURL: this._serverUrl,
            headers: Object.assign({}, this._headers)
        }));
    }
    get serverUrl() {
        return this._serverUrl;
    }
}
exports.default = Client;
