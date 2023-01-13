"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const helpers_1 = require("../helpers");
class Budget {
    constructor({ id, amount, spent, leftToSpend, status, dateCreated, lastUpdated, categoryId, name, warningPercentage }) {
        this._id = id;
        this._amount = amount;
        this._spent = spent;
        this._leftToSpend = leftToSpend;
        this._status = status;
        this._dateCreated =
            typeof dateCreated === 'string'
                ? (0, helpers_1.parseDateTextToUnix)(dateCreated)
                : dateCreated;
        this._lastUpdated =
            typeof lastUpdated === 'string'
                ? (0, helpers_1.parseDateTextToUnix)(lastUpdated)
                : lastUpdated;
        this._categoryId = categoryId;
        this._name = name;
        this._warningPercentage = warningPercentage;
    }
    get id() {
        return this._id;
    }
    get amount() {
        return this._amount;
    }
    get spent() {
        return this._spent;
    }
    get leftToSpend() {
        return this._leftToSpend;
    }
    get status() {
        return this._status;
    }
    get dateCreated() {
        return this._dateCreated;
    }
    get lastUpdated() {
        return this._lastUpdated;
    }
    get categoryId() {
        return this._categoryId;
    }
    get name() {
        return this._name;
    }
    get warningPercentage() {
        return this._warningPercentage;
    }
    toObject() {
        return {
            id: this._id,
            amount: this._amount,
            spent: this._spent,
            leftToSpend: this._leftToSpend,
            status: this._status,
            dateCreated: this._dateCreated,
            lastUpdated: this._lastUpdated,
            categoryId: this._categoryId,
            name: this._name,
            warningPercentage: this._warningPercentage
        };
    }
}
exports.default = Budget;
