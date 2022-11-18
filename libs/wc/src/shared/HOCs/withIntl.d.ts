import React, { FC } from 'react';
import ILangResources from '../interfaces/ILangResources';
import { Dictionary } from '../types';
declare const withIntl: (langResources?: ILangResources | undefined) => (Component: FC<{
    texts: Dictionary;
}>) => React.FC<{
    lang: string;
    currencyLang: string;
    currencyType: string;
}>;
export default withIntl;
