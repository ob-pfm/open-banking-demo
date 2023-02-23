"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Transaction_1 = __importDefault(require("../models/Transaction"));
const Client_1 = __importDefault(require("./Client"));
class TransactionsClient extends Client_1.default {
    constructor() {
        super(...arguments);
        this._path = '/open-finances/transactions';
    }
    getUriByOptions(accountId, listOptions) {
        const uri = `${this._path}?accountId=${accountId}`;
        if (!listOptions) {
            return uri;
        }
        const { categoryId, description, charge, minAmount, maxAmount, dateFrom, dateTo, cursor } = listOptions;
        return `${uri}${categoryId ? `&categoryId=${categoryId}` : ''}${description ? `&description=${description}` : ''}${typeof charge === 'boolean' ? `&charge=${charge}` : ''}${minAmount ? `&minAmount=${minAmount}` : ''}${maxAmount ? `&maxAmount=${maxAmount}` : ''}${dateFrom ? `&dateFrom=${dateFrom}` : ''}${dateTo ? `&dateTo=${dateTo}` : ''}${cursor ? `&cursor=${cursor}` : ''}`;
    }
    processResponse(response) {
        return new Transaction_1.default(response);
    }
    processListResponseBuild(accountId) {
        return (response) => {
            if (!response.data) {
                return { data: [], nextCursor: 0 };
            }
            return {
                data: response.data.map((transaction) => new Transaction_1.default(Object.assign(Object.assign({}, transaction), { accountId }))),
                nextCursor: response.nextCursor || 0
            };
        };
    }
    getList(accountId, listOptions) {
        const uri = this.getUriByOptions(accountId, listOptions);
        return this._apiCore.doGet(uri, this.processListResponseBuild(accountId));
    }
    get(id) {
        return this._apiCore.doGet(`${this._path}/${id}`, this.processResponse);
    }
    create(transactionToCreate) {
        return this._apiCore.doPost(this._path, transactionToCreate.toObject(), this.processResponse);
    }
    edit(id, transactionToUpdate) {
        return this._apiCore.doPut(`${this._path}/${id}`, transactionToUpdate.toObject(), this.processResponse);
    }
    delete(id) {
        return this._apiCore.doDelete(`${this._path}/${id}`);
    }
    deleteAll(accountId) {
        return this._apiCore.doDelete(`${this._path}?accountId=${accountId}`);
    }
}
exports.default = TransactionsClient;
