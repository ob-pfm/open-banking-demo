"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Budget_1 = __importDefault(require("../models/Budget"));
const Client_1 = __importDefault(require("./Client"));
class BudgetsClient extends Client_1.default {
    constructor() {
        super(...arguments);
        this._path = '/open-finances/budgets';
    }
    processListResponse(response) {
        return response.data.map((budgetData) => new Budget_1.default(budgetData));
    }
    processResponse(response) {
        return new Budget_1.default(response);
    }
    getList(userId, cursor) {
        return this._apiCore.doGet(`${this._path}?userId=${userId}${cursor ? `&cursor=${cursor}` : ''}`, this.processListResponse);
    }
    get(id) {
        return this._apiCore.doGet(`${this._path}/${id}`, this.processResponse);
    }
    create(budgetToCreate) {
        return this._apiCore.doPost(this._path, budgetToCreate.toObject(), this.processResponse);
    }
    edit(id, budgetToUpdate) {
        return this._apiCore.doPut(`${this._path}/${id}`, budgetToUpdate, this.processResponse);
    }
    delete(id) {
        return this._apiCore.doDelete(`${this._path}/${id}`);
    }
}
exports.default = BudgetsClient;
