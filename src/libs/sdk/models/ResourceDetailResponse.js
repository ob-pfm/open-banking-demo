"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class ResourceDetailResponse {
    constructor({ bankId, userId, resources }) {
        this._bankId = bankId;
        this._userId = userId;
        this._resources = resources;
    }
    get bankId() {
        return this._bankId;
    }
    get userId() {
        return this._userId;
    }
    get resources() {
        return this._resources;
    }
    toObject() {
        return {
            bankId: this._bankId,
            userId: this._userId,
            resources: this._resources
        };
    }
}
exports.default = ResourceDetailResponse;
