"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Bank {
    constructor({ bankId, name, imagePath }) {
        this._bankId = bankId;
        this._name = name;
        this._imagePath = imagePath;
    }
    get bankId() {
        return this._bankId;
    }
    get name() {
        return this._name;
    }
    get imagePath() {
        return this._imagePath;
    }
    toObject() {
        return {
            bankId: this._bankId,
            name: this._name,
            imagePath: this._imagePath
        };
    }
}
exports.default = Bank;
