"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class TransactionPayload {
    constructor({ accountId, amount, charge, date, description, categoryId }) {
        this._accountId = accountId;
        this._amount = amount;
        this._charge = charge;
        this._date = date;
        this._description = description;
        this._categoryId = categoryId;
    }
    get accountId() {
        return this._accountId;
    }
    set accountId(value) {
        this._accountId = value;
    }
    get amount() {
        return this._amount;
    }
    set amount(value) {
        this._amount = value;
    }
    get charge() {
        return this._charge;
    }
    set charge(value) {
        this._charge = value;
    }
    get date() {
        return this._date;
    }
    set date(value) {
        this._date = value;
    }
    get description() {
        return this._description;
    }
    set description(value) {
        this._description = value;
    }
    get categoryId() {
        return this._categoryId;
    }
    set categoryId(value) {
        this._categoryId = value;
    }
    toObject() {
        return {
            accountId: this._accountId,
            amount: this._amount,
            categoryId: this._categoryId,
            charge: this._charge,
            date: this._date,
            description: this._description
        };
    }
}
exports.default = TransactionPayload;
