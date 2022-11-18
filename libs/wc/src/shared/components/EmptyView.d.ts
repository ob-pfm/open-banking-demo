import { FC } from 'react';
interface IProps {
    actionText: string;
    description: string;
    fontFamily?: string;
    handleAction: () => void;
    imageIcon: FC;
    title: string;
}
declare const EmptyView: FC<IProps>;
export default EmptyView;
