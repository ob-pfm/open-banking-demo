"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class AccountPayload {
    constructor({ userId, financialEntityId, nature, name, number, balance, chargeable }) {
        this._userId = userId;
        this._financialEntityId = financialEntityId;
        this._nature = nature;
        this._name = name;
        this._number = number;
        this._balance = balance;
        this._chargeable = chargeable;
    }
    get userId() {
        return this._userId;
    }
    set userId(value) {
        this._userId = value;
    }
    get financialEntityId() {
        return this._financialEntityId;
    }
    set financialEntityId(value) {
        this._financialEntityId = value;
    }
    get nature() {
        return this._nature;
    }
    set nature(value) {
        this._nature = value;
    }
    get name() {
        return this._name;
    }
    set name(value) {
        this._name = value;
    }
    get number() {
        return this._number;
    }
    set number(value) {
        this._number = value;
    }
    get balance() {
        return this._balance;
    }
    set balance(value) {
        this._balance = value;
    }
    get chargeable() {
        return this._chargeable;
    }
    set chargeable(value) {
        this._chargeable = value;
    }
    get plainObject() {
        return {
            userId: this._userId,
            financialEntityId: this._financialEntityId,
            nature: this._nature,
            name: this._name,
            number: this._number,
            balance: this._balance,
            chargeable: this._chargeable
        };
    }
}
exports.default = AccountPayload;
