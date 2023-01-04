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
const constants_1 = require("../constants");
const Client_1 = __importDefault(require("./Client"));
class BanksClient extends Client_1.default {
    constructor(apiKey, sandbox) {
        super(apiKey, sandbox);
        this._path = '/open-banking/banks';
        this._isRunningPolling = false;
    }
    aggStatusBankSubscribe(options) {
        return __awaiter(this, void 0, void 0, function* () {
            const { bankId, userId, onConsentRequestedStatus, onConsentGrantedStatus, onConsentDeletedStatus, onAggregationStartedStatus, onAggregationCompletedStatus, onFailedStatus, onServerError } = options;
            if (this._isRunningPolling) {
                const response = yield fetch(`${this._serverUrl}${this._path}/${bankId}/status?userId=${userId}`);
                if (response.status == 502) {
                    yield this.aggStatusBankSubscribe(options);
                }
                else if (response.status != 200) {
                    if (onServerError) {
                        onServerError(response);
                    }
                    this.aggregationStatusUnsubscribe();
                }
                else {
                    const data = yield response.json();
                    switch (data.status) {
                        case constants_1.CONSENT_REQUESTED_STATUS:
                            onConsentRequestedStatus && onConsentRequestedStatus();
                            break;
                        case constants_1.CONSENT_GRANTED_STATUS:
                            onConsentGrantedStatus && onConsentGrantedStatus();
                            break;
                        case constants_1.CONSENT_DELETED_STATUS:
                            onConsentDeletedStatus && onConsentDeletedStatus();
                            break;
                        case constants_1.AGGREGATION_STARTED_STATUS:
                            onAggregationStartedStatus && onAggregationStartedStatus();
                            break;
                        case constants_1.AGGREGATION_COMPLETED_STATUS:
                            onAggregationCompletedStatus && onAggregationCompletedStatus();
                            break;
                        case constants_1.PROCESS_FAILED_STATUS:
                            onFailedStatus && onFailedStatus();
                            break;
                        default:
                            onServerError && onServerError(response);
                            this.aggregationStatusUnsubscribe();
                    }
                    yield this.aggStatusBankSubscribe(options);
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
            return response.banks.map((bankData) => new models_1.Bank(bankData));
        });
    }
    getConsent(bankId, userId, time) {
        return this._apiCore.doGet(`${this._path}/${bankId}/consents?userId=${userId}&time=${time}`, (response) => {
            return new models_1.ConsentCreateResponse(response);
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
            this._isRunningPolling = false;
        }
    }
}
exports.default = BanksClient;
