import IInfo from './IInfo';
export default interface IUser {
    accountExpired?: boolean;
    accountLocked?: boolean;
    customerId?: number;
    dateCreated?: Date;
    name?: string;
    email?: string;
    enabled?: boolean;
    id?: string;
    lastUpdated?: Date;
    notificationsEnabled?: boolean;
    passwordExpired?: boolean;
    termsAndConditionsAccepted?: boolean;
    type?: string;
    birthdate?: Date;
    homeIncome?: IInfo;
    homeSize?: IInfo;
    homeType?: IInfo;
    password?: string;
    ratingDate?: Date;
    maritalStatus?: IInfo;
    profession?: IInfo;
    professionalDegree?: IInfo;
    zipCode?: string;
}
