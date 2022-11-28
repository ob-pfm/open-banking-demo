"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class ConsentCreateResponse {
    constructor({ bankId, userId, url }) {
        this._bankId = bankId;
        this._userId = userId;
        this._url = url;
    }
    get bankId() {
        return this._bankId;
    }
    get userId() {
        return this._userId;
    }
    get url() {
        return this._url;
    }
    getPlainObject() {
        return {
            bankId: this._bankId,
            userId: this._userId,
            url: this._url
        };
    }
}
exports.default = ConsentCreateResponse;
