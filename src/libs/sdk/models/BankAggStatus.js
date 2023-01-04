"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class BankAggStatus {
    constructor({ bankId, userId, status }) {
        this._bankId = bankId;
        this._userId = userId;
        this._status = status;
    }
    get bankId() {
        return this._bankId;
    }
    get userId() {
        return this._userId;
    }
    get status() {
        return this._status;
    }
    getPlainObject() {
        return {
            bankId: this._bankId,
            userId: this._userId,
            status: this._status
        };
    }
}
exports.default = BankAggStatus;
