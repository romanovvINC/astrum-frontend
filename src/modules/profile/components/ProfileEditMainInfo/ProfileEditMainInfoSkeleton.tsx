import { FC } from "react";
import Skeleton from "react-loading-skeleton";

import s from "./ProfileEditMainInfo.module.scss";

const ProfileEditMainInfoSkeleton: FC = () => {
    return <Skeleton className={s.skeleton} />;
};

export default ProfileEditMainInfoSkeleton;
