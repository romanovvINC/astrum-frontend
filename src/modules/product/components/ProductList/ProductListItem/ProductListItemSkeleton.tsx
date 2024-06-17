import { FC } from "react";
import Skeleton from "react-loading-skeleton";

import s from "./ProductListItem.module.scss";

const ProductListItemSkeleton: FC = () => {
    return <Skeleton className={s.skeleton} />;
};

export default ProductListItemSkeleton;
