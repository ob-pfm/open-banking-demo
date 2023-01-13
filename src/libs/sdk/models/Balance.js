"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Balance {
    constructor({ date, incomes, expenses }) {
        this._incomes = incomes;
        this._expenses = expenses;
        this._date = date;
    }
    get date() {
        return this._date;
    }
    set date(date) {
        this._date = date;
    }
    get incomes() {
        return this._incomes;
    }
    set incomes(incomes) {
        this._incomes = incomes;
    }
    get expenses() {
        return this._expenses;
    }
    set expenses(expenses) {
        this._expenses = expenses;
    }
}
exports.default = Balance;
