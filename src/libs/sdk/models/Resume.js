"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Balance_1 = __importDefault(require("./Balance"));
const IncomeExpense_1 = __importDefault(require("./IncomeExpense"));
class Resume {
    constructor({ incomes, expenses, balances }) {
        this._incomes = incomes.map((income) => new IncomeExpense_1.default(income));
        this._expenses = expenses.map((expense) => new IncomeExpense_1.default(expense));
        this._balances = balances.map((balance) => new Balance_1.default(balance));
    }
    get incomes() {
        return this._incomes;
    }
    get expenses() {
        return this._expenses;
    }
    get balances() {
        return this._balances;
    }
}
exports.default = Resume;
