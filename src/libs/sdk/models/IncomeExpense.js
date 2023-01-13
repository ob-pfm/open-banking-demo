"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const CategoryInsights_1 = __importDefault(require("./CategoryInsights"));
class IncomeExpense {
    constructor({ date, categories, amount }) {
        this._date = date;
        this._categories = categories.map((cat) => new CategoryInsights_1.default(cat));
        this._amount = amount;
    }
    get date() {
        return this._date;
    }
    get categories() {
        return this._categories;
    }
    get amount() {
        return this._amount;
    }
}
exports.default = IncomeExpense;
