"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Transaction_1 = __importDefault(require("./Transaction"));
const TransactionsByDate_1 = __importDefault(require("./TransactionsByDate"));
class SubcategoryInsights {
    constructor({ categoryId, amount, average, quantity, transactionsByDate, transactions }) {
        this._categoryId = categoryId;
        this._amount = amount;
        this._average = average;
        this._quantity = quantity;
        this._transactionsByDate = transactionsByDate
            ? transactionsByDate.map((transaction) => new TransactionsByDate_1.default(transaction))
            : [];
        this._transactions = transactions
            ? transactions.map((transaction) => new Transaction_1.default(transaction))
            : [];
    }
    get categoryId() {
        return this._categoryId;
    }
    get amount() {
        return this._amount;
    }
    get average() {
        return this._average;
    }
    get quantity() {
        return this._quantity;
    }
    get transactionsByDate() {
        return this._transactionsByDate;
    }
    get transactions() {
        return this._transactions;
    }
}
exports.default = SubcategoryInsights;
