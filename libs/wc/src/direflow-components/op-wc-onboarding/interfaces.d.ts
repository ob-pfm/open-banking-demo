import ISharedProperties from '../../shared/interfaces/IProperties';
import ICommonProps from '../../shared/interfaces/ICommonProps';
export interface IMainProps extends ISharedProperties, ICommonProps {
    title: string | null;
    titleIsShown: string | boolean;
    closeDisabled: string | boolean;
    description: string | null;
    descriptionIsShown: string | boolean;
    continueButton: string | null;
    cpfFieldPlaceholder: string | null;
    cpfFieldIsShown: string | boolean;
    isShown: string | boolean;
}
