"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class ConsumeConsentResponse {
    constructor({ authCode, token, state }) {
        this._authCode = authCode;
        this._token = token;
        this._state = state;
    }
    get authCode() {
        return this._authCode;
    }
    get token() {
        return this._token;
    }
    get state() {
        return this._state;
    }
    toObject() {
        return {
            authCode: this._authCode,
            token: this._token,
            state: this._state
        };
    }
}
exports.default = ConsumeConsentResponse;
