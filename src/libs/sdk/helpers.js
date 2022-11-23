"use strict";
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.signUp = exports.buildClients = exports.processErrors = void 0;
const axios_1 = __importDefault(require("axios"));
const constants_1 = require("./constants");
const clients_1 = require("./clients");
const models_1 = require("./models");
const createErrorList = (errorResponse) => {
    const errorsList = [];
    errorResponse.errors.forEach((error) => {
        errorsList.push(new models_1.Error(error.code, error.title, error.detail));
    });
    return errorsList;
};
const createErrorItem = (status, title, message) => {
    return new models_1.Error(`${status}`, title, message || '');
};
const createErrorObject = (error) => {
    return new models_1.Error(`${error.code || '0'}`, 'Error System', `${error}`);
};
const processErrors = (error, reject) => {
    if (error.response) {
        if (error.response.status === 500) {
            return reject(createErrorItem(error.response.status, error.response.data.message, error.response.data.message));
        }
        if (error.response.status === 401) {
            return reject(createErrorItem(error.response.status, error.response.statusText));
        }
        if (error.response.status === 400 || error.response.status === 404) {
            return reject(createErrorList(error.response.data));
        }
    }
    return reject(createErrorObject(error));
};
exports.processErrors = processErrors;
const buildClients = (apiKey, sandbox) => ({
    accountsClient: new clients_1.AccountsClient(apiKey, sandbox),
    banksClient: new clients_1.BanksClient(apiKey, sandbox),
    transactionsClient: new clients_1.TransactionsClient(apiKey, sandbox),
    usersClient: new clients_1.UsersClient(apiKey, sandbox)
});
exports.buildClients = buildClients;
const signUp = (userForm) => new Promise((resolve, reject) => {
    const _a = userForm, { sandbox, apiKey } = _a, rest = __rest(_a, ["sandbox", "apiKey"]);
    if (!rest.name ||
        !rest.firstLastName ||
        !rest.secondLastName ||
        !rest.email ||
        !rest.companyName ||
        !rest.username ||
        !rest.password ||
        !rest.countryShortName) {
        return reject(new models_1.Error('400', '', ''));
    }
    axios_1.default
        .post(`${sandbox ? constants_1.SERVER_URL_SANDBOX : constants_1.SERVER_URL_PROD}/onboarding/signup`, rest, {
        headers: {
            'X-api-key': apiKey
        }
    })
        .then((response) => resolve(new models_1.SignUpResponse(response.data)))
        .catch((error) => (0, exports.processErrors)(error, reject));
});
exports.signUp = signUp;
