interface IUserForm {
    name: string;
    firstLastName: string;
    secondLastName: string;
    email: string;
    companyName: string;
    username: string;
    password: string;
    countryShortName: string;
    apiKey: string;
    sandbox?: string;
}
interface ISignUpResponse {
    id: number;
    name: string;
    firstLastName: string;
    secondLastName: string;
    email: string;
    companyName: string;
    username: string;
    apiKey: string;
}
declare class SignUpResponse implements ISignUpResponse {
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
declare const SignUp: (userForm: IUserForm | unknown) => Promise<SignUpResponse>;
export default SignUp;
