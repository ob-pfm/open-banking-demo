"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class TransactionPayload {
    constructor({ amount, charge, date, description, categoryId }) {
        this._amount = amount;
        this._charge = charge;
        this._date = date;
        this._description = description;
        this._categoryId = categoryId || null;
    }
    get amount() {
        return this._amount;
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
    get categoryId() {
        return this._categoryId;
    }
    get plainObject() {
        return {
            amount: this._amount,
            categoryId: this._categoryId,
            charge: this._charge,
            date: this._date,
            description: this._description
        };
    }
}
exports.default = TransactionPayload;
