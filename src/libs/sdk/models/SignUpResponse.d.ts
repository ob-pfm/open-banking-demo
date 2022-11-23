import ISignUpResponse from '../interfaces/ISignUpResponse';
export default class SignUpResponse implements ISignUpResponse {
    id: number;
    name: string;
    firstLastName: string;
    secondLastName: string;
    email: string;
    companyName: string;
    username: string;
    apiKey: string;
    constructor({ id, name, firstLastName, secondLastName, email, companyName, username, apiKey }: ISignUpResponse);
}
