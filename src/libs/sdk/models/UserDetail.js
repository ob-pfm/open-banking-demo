"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class UserDetail {
    constructor({ id, cpf, dateCreated }) {
        this._id = id;
        this._cpf = cpf;
        this._dateCreated = dateCreated;
    }
    get id() {
        return this._id;
    }
    get cpf() {
        return this._cpf;
    }
    get dateCreated() {
        return this._dateCreated;
    }
    getPlainObject() {
        return {
            id: this._id,
            cpf: this._cpf,
            dateCreated: this._dateCreated
        };
    }
}
exports.default = UserDetail;
