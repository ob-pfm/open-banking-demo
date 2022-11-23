"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Transaction {
    constructor({ id, charge }) {
        this._id = id;
        this._charge = charge;
    }
    get id() {
        return this._id;
    }
    get charge() {
        return this._charge;
    }
    getPlainObject() {
        return {
            id: this._id,
            charge: this._charge
        };
    }
}
exports.default = Transaction;
