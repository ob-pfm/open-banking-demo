"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const CategoryInsights_1 = __importDefault(require("./CategoryInsights"));
class Analysis {
    constructor({ date, categories }) {
        this._date = date;
        this._categories = categories.map((cat) => new CategoryInsights_1.default(cat));
    }
    get date() {
        return this._date;
    }
    get categories() {
        return this._categories;
    }
}
exports.default = Analysis;
