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
Object.defineProperty(exports, "__esModule", { value: true });
const api_1 = require("../api");
const models_1 = require("../models");
class Banks {
    constructor(apiSettings) {
        this.path = '/open-banking/banks';
        this._apiCore = new api_1.ApiCore(apiSettings);
        this._isRunningPolling = false;
    }
    aggStatusBankSubscribe(options) {
        return __awaiter(this, void 0, void 0, function* () {
            const { bankId, userId, onCompletedStatus, onInProcessStatus, onFailedStatus, onServerError } = options;
            if (this._isRunningPolling) {
                const response = yield fetch(`${this._apiCore.serverUrl}${this.path}/${bankId}/status?userId=${userId}`);
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
                        case 'completed':
                            onCompletedStatus && onCompletedStatus();
                            break;
                        case 'in process':
                            onInProcessStatus && onInProcessStatus();
                            break;
                        case 'failed':
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
        return this._apiCore.doGet(`${this.path}/available`, (response) => {
            return response.banks.map((bankData) => new models_1.Bank(bankData));
        });
    }
    getAggregationStatus(bankId, userId) {
        return this._apiCore.doGet(`${this.path}/${bankId}/status?userId=${userId}`, (response) => {
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
exports.default = Banks;
