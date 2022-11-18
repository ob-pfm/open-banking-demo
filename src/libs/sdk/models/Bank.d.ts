import IBank from '../interfaces/IBank';
export default class Bank implements IBank {
    bankId: string;
    name: string;
    imagePath: string;
    constructor({ bankId, name, imagePath }: IBank);
}
