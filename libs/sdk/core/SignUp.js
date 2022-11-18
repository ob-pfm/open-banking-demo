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
const axios_1 = __importDefault(require("axios"));
const constants_1 = require("../constants");
const helpers_1 = require("../helpers");
const models_1 = require("../models");
class SignUpResponse {
    constructor({ id, name, firstLastName, secondLastName, email, companyName, username, apiKey }) {
        this.id = id;
        this.name = name;
        this.firstLastName = firstLastName;
        this.secondLastName = secondLastName;
        this.email = email;
        this.companyName = companyName;
        this.username = username;
        this.apiKey = apiKey;
    }
}
const SignUp = (userForm) => new Promise((resolve, reject) => {
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
        .then((response) => resolve(new SignUpResponse(response.data)))
        .catch((error) => (0, helpers_1.processErrors)(error, reject));
});
exports.default = SignUp;
