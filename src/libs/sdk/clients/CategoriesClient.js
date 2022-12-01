"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const models_1 = require("../models");
const Client_1 = __importDefault(require("./Client"));
class CategoriesClient extends Client_1.default {
    constructor() {
        super(...arguments);
        this._path = '/open-finances/categories';
    }
    processResponse(response) {
        return new models_1.Category(response);
    }
    getList(userId, cursor) {
        return this._apiCore.doGet(`${this._path}?userId=${userId}${cursor ? `&cursor=${cursor}` : ''}`, (response) => {
            return response.data.map((bankData) => new models_1.Category(bankData));
        });
    }
    get(id) {
        return this._apiCore.doGet(`${this._path}/${id}`, this.processResponse);
    }
    create(categoryToCreate) {
        return this._apiCore.doPost(this._path, categoryToCreate, this.processResponse);
    }
    edit(id, categoryToUpdate) {
        return this._apiCore.doPut(`${this._path}/${id}`, categoryToUpdate, this.processResponse);
    }
    delete(id) {
        return this._apiCore.doDelete(`${this._path}/${id}`);
    }
}
exports.default = CategoriesClient;
