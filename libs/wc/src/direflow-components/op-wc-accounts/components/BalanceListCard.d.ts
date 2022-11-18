import { FC } from 'react';
import { Account } from '../../../shared/models';
import { ISectionSetting } from '../interfaces';
interface IProps {
    accounts: Account[];
    currencyFormatter: Intl.NumberFormat;
    sectionSettings: ISectionSetting[];
}
declare const BalanceListCard: FC<IProps>;
export default BalanceListCard;
