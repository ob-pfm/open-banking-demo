"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const api_1 = require("../api");
const Account_1 = __importDefault(require("../models/Account"));
class Accounts {
    constructor(apiSettings) {
        this.path = '/open-finances/accounts';
        this._apiCore = new api_1.ApiCore(apiSettings);
    }
    processListResponse(response) {
        return response.data.map((accountData) => new Account_1.default(accountData));
    }
    processResponse(response) {
        return new Account_1.default(response);
    }
    getList(userId) {
        return this._apiCore.doGet(`${this.path}?userId=${userId}`, this.processListResponse);
    }
    get(id) {
        return this._apiCore.doGet(`${this.path}/${id}`, this.processResponse);
    }
    create(accountToCreate) {
        return this._apiCore.doPost(this.path, accountToCreate, this.processResponse);
    }
    edit(id, accountToUpdate) {
        return this._apiCore.doPut(`${this.path}/${id}`, accountToUpdate, this.processResponse);
    }
    delete(id) {
        return this._apiCore.doDelete(`${this.path}/${id}`);
    }
}
exports.default = Accounts;
