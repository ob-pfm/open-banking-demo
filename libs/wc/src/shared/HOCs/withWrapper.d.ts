import { FC } from 'react';
import ILangResources from '../interfaces/ILangResources';
declare const withWrapper: (Component: FC<any>, langResources?: ILangResources | undefined) => any;
export default withWrapper;
