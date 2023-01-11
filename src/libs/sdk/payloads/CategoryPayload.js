"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class CategoryPayload {
    constructor({ userId, name, color, parentCategoryId }) {
        this._userId = userId;
        this._name = name;
        this._color = color;
        this._parentCategoryId = parentCategoryId;
    }
    get userId() {
        return this._userId;
    }
    set userId(value) {
        this._userId = value;
    }
    get name() {
        return this._name;
    }
    set name(value) {
        this._name = value;
    }
    get color() {
        return this._color;
    }
    set color(value) {
        this._color = value;
    }
    get parentCategoryId() {
        return this._parentCategoryId || null;
    }
    set parentCategoryId(value) {
        this._parentCategoryId = value;
    }
    toObject() {
        return {
            userId: this._userId,
            name: this._name,
            color: this._color,
            parentCategoryId: this._parentCategoryId
        };
    }
}
exports.default = CategoryPayload;
