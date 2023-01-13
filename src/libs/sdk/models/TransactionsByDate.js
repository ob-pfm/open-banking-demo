"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Transaction_1 = __importDefault(require("./Transaction"));
class TransactionsByDate {
    constructor({ date, transactions }) {
        this._date = date;
        this._transactions = transactions.map((transaction) => new Transaction_1.default(transaction));
    }
    get date() {
        return this._date;
    }
    get transactions() {
        return this._transactions;
    }
}
exports.default = TransactionsByDate;
