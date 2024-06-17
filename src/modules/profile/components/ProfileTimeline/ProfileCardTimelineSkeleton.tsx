import { FC } from "react";
import Skeleton from "react-loading-skeleton";

import s from "./ProfileTimeline.module.scss";

const ProfileCardTimelineSkeleton: FC = () => {
    return <Skeleton className={s.skeleton} />;
};

export default ProfileCardTimelineSkeleton;
