import IError from '../interfaces/IError';
export default class Error implements IError {
    code: string;
    title: string;
    detail: string;
    constructor(code: string, title: string, detail: string);
}
