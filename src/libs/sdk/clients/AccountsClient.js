"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Account_1 = __importDefault(require("../models/Account"));
const Client_1 = __importDefault(require("./Client"));
class AccountsClient extends Client_1.default {
    constructor() {
        super(...arguments);
        this._path = '/open-finances/accounts';
    }
    processListResponse(response) {
        return response.data.map((accountData) => new Account_1.default(accountData));
    }
    processResponse(response) {
        if (!response) {
            return null;
        }
        return new Account_1.default(response);
    }
    getList(userId) {
        return this._apiCore.doGet(`${this._path}?userId=${userId}`, this.processListResponse);
    }
    get(id) {
        return this._apiCore.doGet(`${this._path}/${id}`, this.processResponse);
    }
    create(accountToCreate) {
        return this._apiCore.doPost(this._path, accountToCreate.toObject(), this.processResponse);
    }
    edit(id, accountToUpdate) {
        return this._apiCore.doPut(`${this._path}/${id}`, accountToUpdate, this.processResponse);
    }
    delete(id) {
        return this._apiCore.doDelete(`${this._path}/${id}`);
    }
}
exports.default = AccountsClient;
