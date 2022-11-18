import { FC } from 'react';
interface IProps {
    className?: string;
    defaultValue: string;
    disabled?: boolean;
    handleDebounce?: (value: string) => void;
    id?: string;
    placeholder?: string;
    debounceTime?: number;
}
declare const SearchField: FC<IProps>;
export default SearchField;
