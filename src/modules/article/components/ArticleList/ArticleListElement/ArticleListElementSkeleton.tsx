import { FC } from "react";
import Skeleton from "react-loading-skeleton";

import s from "./ArticleListElement.module.scss";

const ArticleListElementSkeleton: FC = () => {
    return <Skeleton className={s.skeleton} />;
};

export default ArticleListElementSkeleton;
