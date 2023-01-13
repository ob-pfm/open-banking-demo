"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const api_1 = require("../api");
const Transaction_1 = __importDefault(require("../models/Transaction"));
class Transactions {
    constructor(apiSettings) {
        this.path = '/open-finances/transactions';
        this._apiCore = new api_1.ApiCore(apiSettings);
    }
    processListResponse(response) {
        return response.data.map((transactionData) => new Transaction_1.default(transactionData));
    }
    processResponse(response) {
        return new Transaction_1.default(response);
    }
    getList(accountId) {
        return this._apiCore.doGet(`${this.path}?accountId=${accountId}`, this.processListResponse);
    }
    get(id) {
        return this._apiCore.doGet(`${this.path}/${id}`, this.processResponse);
    }
    create(transactionToCreate) {
        return this._apiCore.doPost(this.path, transactionToCreate, this.processResponse);
    }
    edit(id, transactionToUpdate) {
        return this._apiCore.doPut(`${this.path}/${id}`, transactionToUpdate, this.processResponse);
    }
    delete(id) {
        return this._apiCore.doDelete(`${this.path}/${id}`);
    }
    deleteAll(accountId) {
        return this._apiCore.doDelete(`${this.path}?accountId=${accountId}`);
    }
}
exports.default = Transactions;
