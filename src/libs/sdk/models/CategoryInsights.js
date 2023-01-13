"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Transaction_1 = __importDefault(require("./Transaction"));
const SubcategoryInsights_1 = __importDefault(require("./SubcategoryInsights"));
class CategoryInsights {
    constructor({ categoryId, amount, average, quantity, subcategories, transactions }) {
        this._categoryId = categoryId;
        this._amount = amount;
        this._average = average;
        this._quantity = quantity;
        this._subcategories = subcategories
            ? subcategories.map((subcat) => new SubcategoryInsights_1.default(subcat))
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
    get subcategories() {
        return this._subcategories;
    }
    get transactions() {
        return this._transactions;
    }
}
exports.default = CategoryInsights;
