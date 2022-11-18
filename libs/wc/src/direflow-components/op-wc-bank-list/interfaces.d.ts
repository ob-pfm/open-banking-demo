import ISharedProperties from '../../shared/interfaces/IProperties';
import ICommonProps from '../../shared/interfaces/ICommonProps';
import IBank from '../../shared/interfaces/IBank';
export interface IMainProps extends ISharedProperties, ICommonProps {
    banksData: string | IBank[];
    closeDisabled: string | boolean;
    title: string | null;
    titleIsShown: string | boolean;
    description: string | null;
    descriptionIsShown: string | boolean;
    isShown: string | boolean;
}
