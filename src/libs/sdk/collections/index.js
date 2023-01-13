"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Users = exports.Transactions = exports.Banks = exports.Accounts = void 0;
var Accounts_1 = require("./Accounts");
Object.defineProperty(exports, "Accounts", { enumerable: true, get: function () { return __importDefault(Accounts_1).default; } });
var Banks_1 = require("./Banks");
Object.defineProperty(exports, "Banks", { enumerable: true, get: function () { return __importDefault(Banks_1).default; } });
var Transactions_1 = require("./Transactions");
Object.defineProperty(exports, "Transactions", { enumerable: true, get: function () { return __importDefault(Transactions_1).default; } });
var Users_1 = require("./Users");
Object.defineProperty(exports, "Users", { enumerable: true, get: function () { return __importDefault(Users_1).default; } });
