"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class BankPayload {
    constructor(_bankId, _name, _imagePath) {
        this._bankId = _bankId;
        this._name = _name;
        this._imagePath = _imagePath;
    }
    get bankId() {
        return this._bankId;
    }
    set bankId(value) {
        this._bankId = value;
    }
    get name() {
        return this._name;
    }
    set name(value) {
        this._name = value;
    }
    get imagePath() {
        return this._imagePath;
    }
    set imagePath(value) {
        this._imagePath = value;
    }
    get plainObject() {
        return {
            bankId: this._bankId,
            name: this._name,
            imagePath: this._imagePath
        };
    }
}
exports.default = BankPayload;
