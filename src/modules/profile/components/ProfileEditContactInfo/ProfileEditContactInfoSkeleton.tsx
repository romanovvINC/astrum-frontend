import { FC } from "react";
import Skeleton from "react-loading-skeleton";

import s from "./ProfileEditContactInfo.module.scss";

const ProfileEditContactInfoSkeleton: FC = () => {
    return <Skeleton className={s.skeleton} />;
};

export default ProfileEditContactInfoSkeleton;
