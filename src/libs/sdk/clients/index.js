"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsersClient = exports.TransactionsClient = exports.BanksClient = exports.AccountsClient = void 0;
var AccountsClient_1 = require("./AccountsClient");
Object.defineProperty(exports, "AccountsClient", { enumerable: true, get: function () { return __importDefault(AccountsClient_1).default; } });
var BanksClient_1 = require("./BanksClient");
Object.defineProperty(exports, "BanksClient", { enumerable: true, get: function () { return __importDefault(BanksClient_1).default; } });
var TransactionsClient_1 = require("./TransactionsClient");
Object.defineProperty(exports, "TransactionsClient", { enumerable: true, get: function () { return __importDefault(TransactionsClient_1).default; } });
var UsersClient_1 = require("./UsersClient");
Object.defineProperty(exports, "UsersClient", { enumerable: true, get: function () { return __importDefault(UsersClient_1).default; } });
