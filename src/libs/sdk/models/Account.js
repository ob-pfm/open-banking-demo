"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Account {
    constructor({ id, providerId, nature, name, number, balance, chargeable, dateCreated, lastUpdated }) {
        this._id = id;
        this._providerId = providerId || null;
        this._nature = nature;
        this._name = name;
        this._number = number;
        this._balance = balance;
        this._chargeable = chargeable;
        this._dateCreated = dateCreated;
        this._lastUpdated = lastUpdated;
    }
    get id() {
        return this._id;
    }
    get providerId() {
        return this._providerId;
    }
    get nature() {
        return this._nature;
    }
    get name() {
        return this._name;
    }
    get number() {
        return this._number;
    }
    get balance() {
        return this._balance;
    }
    get chargeable() {
        return this._chargeable;
    }
    get dateCreated() {
        return this._dateCreated;
    }
    get lastUpdated() {
        return this._lastUpdated;
    }
    getPlainObject() {
        return {
            id: this._id,
            providerId: this._providerId,
            nature: this._nature,
            name: this._name,
            number: this._number,
            balance: this._balance,
            chargeable: this._chargeable,
            dateCreated: this._dateCreated,
            lastUpdated: this._lastUpdated
        };
    }
}
exports.default = Account;
