import { CSSProperties } from 'react';
import { ToastTrigger } from '../types';
export default interface IProperties {
    componentStyles?: string | Record<string, unknown> | CSSProperties;
    showMainLoading: boolean;
    mainLoadingSize: string;
    showModalLoading: boolean;
    modalLoadingSize: string;
    fontFamily: string;
    showToast: ToastTrigger;
    lang: string;
    currencyLang: string;
    currencyType: string;
    showAlert: boolean;
    alertText: string;
    alertType: 'warning' | 'danger' | 'success';
}
