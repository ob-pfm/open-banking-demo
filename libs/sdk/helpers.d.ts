import { AxiosError } from 'axios';
export declare const processErrors: (error: AxiosError, reject: {
    (reason?: unknown): void;
    (arg0: AxiosError<unknown, unknown>): void;
}) => void;
