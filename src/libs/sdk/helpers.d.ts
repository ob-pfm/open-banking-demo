import { AxiosError } from 'axios';
import { IUserForm } from './interfaces';
import { SignUpResponse } from './models';
import { ClientDictionary } from './types';
export declare const processErrors: (error: AxiosError, reject: {
    (reason?: unknown): void;
    (arg0: AxiosError<unknown, unknown>): void;
}) => void;
export declare const buildClients: (apiKey: string, sandbox?: boolean) => ClientDictionary;
export declare const signUp: (userForm: IUserForm | unknown) => Promise<SignUpResponse>;
