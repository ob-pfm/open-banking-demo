import IBank from '../interfaces/IBank';
export default class Bank implements IBank {
    private _bankId;
    private _name;
    private _imagePath;
    constructor({ bankId, name, imagePath }: IBank);
    get bankId(): string;
    get name(): string;
    get imagePath(): string;
    toObject(): IBank;
}
