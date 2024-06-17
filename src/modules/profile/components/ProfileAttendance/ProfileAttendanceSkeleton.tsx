import { FC } from "react";
import Skeleton from "react-loading-skeleton";

import s from "./ProfileAttendance.module.scss";

const ProfileAttendanceSkeleton: FC = () => {
    return <Skeleton className={s.skeleton} />;
};

export default ProfileAttendanceSkeleton;
