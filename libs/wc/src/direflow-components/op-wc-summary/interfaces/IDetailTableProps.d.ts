import Subcategory from '../../../shared/models/insights/Subcategory';
export interface IDetailTableProps {
    type: string;
    subcategories: Subcategory[] | undefined;
    subtitle: string;
    prefixClass: string;
    conTitle: string;
    catTitle: string;
    dateTitle: string;
    amTitle: string;
}
