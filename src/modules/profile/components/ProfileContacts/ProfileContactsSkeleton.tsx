import { FC } from "react";
import Skeleton from "react-loading-skeleton";

import s from "./ProfileContacts.module.scss";

const ProfileContactsSkeleton: FC = () => {
    return <Skeleton className={s.skeleton} />;
};

export default ProfileContactsSkeleton;
