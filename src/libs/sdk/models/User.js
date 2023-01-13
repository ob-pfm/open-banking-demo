"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class User {
    constructor({ userId, cpf }) {
        this._userId = userId;
        this._cpf = cpf;
    }
    get userId() {
        return this._userId;
    }
    get cpf() {
        return this._cpf;
    }
    toObject() {
        return {
            userId: this._userId,
            cpf: this._cpf
        };
    }
}
exports.default = User;
