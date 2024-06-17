import { FC } from "react";
import Skeleton from "react-loading-skeleton";

import s from "./ProfileInfoDetails.module.scss";

const ProfileInfoDetailsSkeleton: FC = () => {
    return <Skeleton className={s.skeleton} />;
};

export default ProfileInfoDetailsSkeleton;
