"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Category_1 = __importDefault(require("./Category"));
class ParentCategory extends Category_1.default {
    constructor({ id, name, color, imagePath, parentCategoryId, userId, dateCreated, lastUpdated }, subcategories = []) {
        super({
            id,
            name,
            color,
            imagePath,
            parentCategoryId,
            userId,
            dateCreated,
            lastUpdated
        });
        this._subcategories = subcategories;
    }
    get subcategories() {
        return this._subcategories;
    }
    set subcategories(subcategories) {
        this._subcategories = subcategories;
    }
    toObject() {
        return {
            id: this._id,
            name: this._name,
            color: this._color,
            imagePath: this._imagePath,
            parentCategoryId: this._parentCategoryId,
            userId: this._userId,
            dateCreated: this._dateCreated,
            lastUpdated: this._lastUpdated,
            subcategories: this._subcategories
        };
    }
}
exports.default = ParentCategory;
