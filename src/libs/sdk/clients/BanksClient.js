"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const models_1 = require("../models");
const Client_1 = __importDefault(require("./Client"));
class BanksClient extends Client_1.default {
    constructor(apiKey, sandbox) {
        super(apiKey, sandbox);
        this._path = '/open-banking/banks';
        this._isRunningPolling = false;
        this._timer = 0;
    }
    aggStatusBankSubscribe(options) {
        return __awaiter(this, void 0, void 0, function* () {
            const { bankId, userId, onResponse, onError } = options;
            if (this._isRunningPolling) {
                const response = yield fetch(`${this._serverUrl}${this._path}/${bankId}/status?userId=${userId}`, {
                    headers: {
                        'X-api-key': this._apiKey
                    }
                });
                if (response.status !== 200) {
                    if (onError) {
                        onError(response);
                    }
                    this.aggregationStatusUnsubscribe();
                }
                else {
                    const data = yield response.json();
                    onResponse(data.status);
                    this._timer = setTimeout(() => __awaiter(this, void 0, void 0, function* () {
                        yield this.aggStatusBankSubscribe(options);
                    }), options.time || 5000);
                }
            }
        });
    }
    getAvailables() {
        return this._apiCore.doGet(`${this._path}/available`, (response) => {
            return response.banks.map((bankData) => new models_1.Bank(bankData));
        });
    }
    getAggregates(userId) {
        return this._apiCore.doGet(`${this._path}/aggregate?userId=${userId}`, (response) => {
            if (!response) {
                return [];
            }
            return response.banks.map((bankData) => new models_1.Bank(bankData));
        });
    }
    createConsent(bankId, userId, time) {
        return this._apiCore.doGet(`${this._path}/${bankId}/consents?userId=${userId}&time=${time}`, (response) => {
            return new models_1.ConsentCreateResponse(response);
        });
    }
    consumeConsent(authCode, token, state) {
        return this._apiCore.doPost(`${this._path}/consume-consents`, { authCode, token, state }, (response) => {
            return new models_1.ConsumeConsentResponse(response);
        });
    }
    getResources(bankId, userId) {
        return this._apiCore.doGet(`${this._path}/${bankId}/resources?userId=${userId}`, (response) => {
            return new models_1.ResourceDetailResponse(response);
        });
    }
    getAggregationStatus(bankId, userId) {
        return this._apiCore.doGet(`${this._path}/${bankId}/status?userId=${userId}`, (response) => {
            return new models_1.BankAggStatus(response);
        });
    }
    aggregationStatusSubscribe(aggSubRequest) {
        this._isRunningPolling = true;
        this.aggStatusBankSubscribe(aggSubRequest);
    }
    aggregationStatusUnsubscribe() {
        if (this._isRunningPolling) {
            clearTimeout(this._timer);
            this._isRunningPolling = false;
        }
    }
    get isRunningPolling() {
        return this._isRunningPolling;
    }
}
exports.default = BanksClient;
