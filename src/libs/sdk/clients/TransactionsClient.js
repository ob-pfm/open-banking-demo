"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Transaction_1 = __importDefault(require("../models/Transaction"));
const Client_1 = __importDefault(require("./Client"));
class TransactionsClient extends Client_1.default {
    constructor() {
        super(...arguments);
        this._path = '/open-finances/transactions';
    }
    processListResponse(response) {
        return response.data.map((transactionData) => new Transaction_1.default(transactionData));
    }
    processResponse(response) {
        return new Transaction_1.default(response);
    }
    getList(accountId) {
        return this._apiCore.doGet(`${this._path}?accountId=${accountId}`, this.processListResponse);
    }
    get(id) {
        return this._apiCore.doGet(`${this._path}/${id}`, this.processResponse);
    }
    create(transactionToCreate) {
        return this._apiCore.doPost(this._path, transactionToCreate, this.processResponse);
    }
    edit(id, transactionToUpdate) {
        return this._apiCore.doPut(`${this._path}/${id}`, transactionToUpdate, this.processResponse);
    }
    delete(id) {
        return this._apiCore.doDelete(`${this._path}/${id}`);
    }
    deleteAll(accountId) {
        return this._apiCore.doDelete(`${this._path}?accountId=${accountId}`);
    }
}
exports.default = TransactionsClient;
