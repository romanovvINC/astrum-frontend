import { FC } from "react";
import Skeleton from "react-loading-skeleton";

import s from "./ProfileListFilter.module.scss";

const ProfileListFilterSkeleton: FC = () => {
    return <Skeleton className={s.skeleton} />;
};

export default ProfileListFilterSkeleton;
