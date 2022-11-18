/// <reference types="react" />
interface IIntlContext {
    currencyFormatter: Intl.NumberFormat;
}
declare const IntlContext: import("react").Context<IIntlContext>;
export default IntlContext;
