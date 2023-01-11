"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const helpers_1 = require("../helpers");
class Transaction {
    constructor({ id, date, charge, description, amount, categoryId, dateCreated, lastUpdated, accountId }) {
        this._id = id;
        this._date = typeof date === 'string' ? (0, helpers_1.parseDateTextToUnix)(date) : date;
        this._charge = charge;
        this._description = description;
        this._amount = amount;
        this._categoryId = categoryId;
        this._dateCreated =
            typeof dateCreated === 'string'
                ? (0, helpers_1.parseDateTextToUnix)(dateCreated)
                : dateCreated;
        this._lastUpdated =
            typeof lastUpdated === 'string'
                ? (0, helpers_1.parseDateTextToUnix)(lastUpdated)
                : lastUpdated;
        this._accountId = accountId;
    }
    get id() {
        return this._id;
    }
    get date() {
        return this._date;
    }
    get charge() {
        return this._charge;
    }
    get description() {
        return this._description;
    }
    get amount() {
        return this._amount;
    }
    get categoryId() {
        return this._categoryId;
    }
    get dateCreated() {
        return this._dateCreated;
    }
    get lastUpdated() {
        return this._lastUpdated;
    }
    get accountId() {
        return this._accountId;
    }
    set accountId(value) {
        this._accountId = value;
    }
    toObject() {
        return {
            id: this._id,
            date: this._date,
            charge: this._charge,
            description: this._description,
            amount: this._amount,
            categoryId: this._categoryId,
            dateCreated: this._dateCreated,
            lastUpdated: this._lastUpdated,
            accountId: this._accountId
        };
    }
}
exports.default = Transaction;
