"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const models_1 = require("../models");
const Client_1 = __importDefault(require("./Client"));
class UsersClient extends Client_1.default {
    processResponse(response) {
        return new models_1.UserDetail(response);
    }
    create(cpf) {
        return this._apiCore.doPost('/onboarding/users', { cpf: cpf }, (response) => new models_1.User(response));
    }
    get(id) {
        return this._apiCore.doGet(`/open-finances/users/${id}`, this.processResponse);
    }
}
exports.default = UsersClient;
