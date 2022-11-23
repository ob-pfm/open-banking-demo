"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
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
exports.default = SignUpResponse;
