"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.processErrors = void 0;
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
