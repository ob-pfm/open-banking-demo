"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const api_1 = require("../api");
const models_1 = require("../models");
class Users {
    constructor(apiSettings) {
        this.path = '/open-finances/users';
        this._apiCore = new api_1.ApiCore(apiSettings);
    }
    processResponse(response) {
        return new models_1.UserDetail(response);
    }
    create(cpf) {
        return this._apiCore.doPost('/onboarding/users', { cpf: cpf }, (response) => new models_1.User(response), true);
    }
    get(id) {
        return this._apiCore.doGet(`${this.path}/${id}`, this.processResponse);
    }
}
exports.default = Users;
