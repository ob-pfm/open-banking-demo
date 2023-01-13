"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class BudgetPayload {
    constructor({ amount, categoryId, name, userId, warningPercentage }) {
        this._amount = amount;
        this._categoryId = categoryId;
        this._name = name;
        this._userId = userId;
        this._warningPercentage = warningPercentage;
    }
    get amount() {
        return this._amount;
    }
    set amount(value) {
        this._amount = value;
    }
    get categoryId() {
        return this._categoryId;
    }
    set categoryId(value) {
        this._categoryId = value;
    }
    get name() {
        return this._name;
    }
    set name(value) {
        this._name = value;
    }
    get userId() {
        return this._userId;
    }
    set userId(value) {
        this._userId = value;
    }
    get warningPercentage() {
        return this._warningPercentage;
    }
    set warningPercentage(value) {
        this._warningPercentage = value;
    }
    toObject() {
        return {
            amount: this._amount,
            categoryId: this._categoryId,
            name: this._name,
            userId: this._userId,
            warningPercentage: this._warningPercentage
        };
    }
}
exports.default = BudgetPayload;
