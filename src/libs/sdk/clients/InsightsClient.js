"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const models_1 = require("../models");
const Client_1 = __importDefault(require("./Client"));
class InsightsClient extends Client_1.default {
    constructor() {
        super(...arguments);
        this._path = '/open-finances/insights';
    }
    getAnalysis(userId, insightsOptions) {
        const { accountId, dateFrom, dateTo } = insightsOptions || {};
        const uri = `${this._path}/analysis?userId=${userId}${accountId ? `?accountId=${accountId}` : ''}${dateFrom ? `?dateFrom=${dateFrom}` : ''}${dateTo ? `?dateTo=${dateTo}` : ''}`;
        return this._apiCore.doGet(uri, (response) => response.data.map((analysis) => new models_1.Analysis(analysis)));
    }
    getResume(userId, insightsOptions) {
        const { accountId, dateFrom, dateTo } = insightsOptions || {};
        const uri = `${this._path}/resume?userId=${userId}${accountId ? `?accountId=${accountId}` : ''}${dateFrom ? `?dateFrom=${dateFrom}` : ''}${dateTo ? `?dateTo=${dateTo}` : ''}`;
        return this._apiCore.doGet(uri, (response) => new models_1.Resume(response));
    }
}
exports.default = InsightsClient;
