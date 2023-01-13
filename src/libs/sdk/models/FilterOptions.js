"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class FilterOptions {
    constructor(initValue) {
        if (initValue) {
            const { minAmount, maxAmount, categoryId, subcategoryId, withCharges, withDebits, accountId, dateFrom, dateTo } = initValue;
            this._minAmount = minAmount;
            this._maxAmount = maxAmount;
            this._categoryId = categoryId;
            this._subcategoryId = subcategoryId;
            this._withCharges = withCharges;
            this._withDebits = withDebits;
            this._accountId = accountId;
            this._dateFrom = dateFrom;
            this._dateTo = dateTo;
        }
    }
    get minAmount() {
        return this._minAmount;
    }
    set minAmount(value) {
        this._minAmount = value;
    }
    get maxAmount() {
        return this._maxAmount;
    }
    set maxAmount(value) {
        this._maxAmount = value;
    }
    get categoryId() {
        return this._categoryId;
    }
    set categoryId(value) {
        this._categoryId = value;
    }
    get subcategoryId() {
        return this._subcategoryId;
    }
    set subcategoryId(value) {
        this._subcategoryId = value;
    }
    get withCharges() {
        return this._withCharges;
    }
    set withCharges(value) {
        this._withCharges = value;
    }
    get withDebits() {
        return this._withDebits;
    }
    set withDebits(value) {
        this._withDebits = value;
    }
    get accountId() {
        return this._accountId;
    }
    set accountId(value) {
        this._accountId = value;
    }
    get dateFrom() {
        return this._dateFrom;
    }
    set dateFrom(value) {
        this._dateFrom = value;
    }
    get dateTo() {
        return this._dateTo;
    }
    set dateTo(value) {
        this._dateTo = value;
    }
    toObject() {
        return {
            minAmount: this._minAmount,
            maxAmount: this._maxAmount,
            categoryId: this._categoryId,
            subcategoryId: this._subcategoryId,
            withCharges: this._withCharges,
            withDebits: this._withDebits,
            accountId: this._accountId,
            dateFrom: this._dateFrom,
            dateTo: this._dateTo
        };
    }
}
exports.default = FilterOptions;
