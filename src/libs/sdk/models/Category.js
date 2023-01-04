"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Category {
    constructor({ id, name, color, imagePath, parentCategoryId, userId, dateCreated, lastUpdated }) {
        this._id = id;
        this._name = name;
        this._color = color;
        this._imagePath = imagePath;
        this._parentCategoryId = parentCategoryId;
        this._userId = userId;
        this._dateCreated = dateCreated;
        this._lastUpdated = lastUpdated;
    }
    get id() {
        return this._id;
    }
    get name() {
        return this._name;
    }
    get color() {
        return this._color;
    }
    get imagePath() {
        return this._imagePath;
    }
    get parentCategoryId() {
        return this._parentCategoryId;
    }
    get userId() {
        return this._userId;
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
            name: this._name,
            color: this._color,
            imagePath: this._imagePath,
            parentCategoryId: this._parentCategoryId,
            userId: this._userId,
            dateCreated: this._dateCreated,
            lastUpdated: this._lastUpdated
        };
    }
}
exports.default = Category;
