import { FC } from "react";
import Skeleton from "react-loading-skeleton";
import s from "./ArticleListFilter.module.scss";

const ArticleListFilterSkeleton: FC = () => {
    return <Skeleton className={s.filter_skeleton} />;
};

export default ArticleListFilterSkeleton;
