import { FC } from 'react';
interface IProps {
    prefixClass: string;
    categoryId: string | undefined;
    name: string | undefined;
    color: string;
    isSubcategory: boolean;
    userId: number | null;
}
declare const CategoryContent: FC<IProps>;
export default CategoryContent;
