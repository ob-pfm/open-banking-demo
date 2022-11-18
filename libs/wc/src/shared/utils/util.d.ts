import ICategory from '../interfaces/ICategory';
import IDictionaryDate from '../interfaces/IDictionaryDate';
export default class Util {
    static categoryList: ICategory[];
    static formattedDate: (date: Date | number | undefined, locale?: string, options?: object) => string;
    static formattedDictionaryDate: (date: Date | number | undefined, locale?: string, options?: object) => IDictionaryDate;
    static formatDateForAllBrowsers: (date: string) => Date;
    static getManualAccountNatureWithOutDefaults: (nature: string) => string;
    static isNilOrUndefined: (value: unknown) => boolean;
    static getCatProperty(id: number | string | undefined, property: string): string | undefined;
    static formatNumber: (n: string) => string;
    static convertUnixDate: (date: number | Date, multiplier?: number) => Date;
    static getBooleanProp: (value: string | boolean) => boolean;
    static getNumberProp: (value: string | number) => number;
}
