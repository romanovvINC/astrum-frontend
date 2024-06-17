import { FC } from "react";
import Skeleton from "react-loading-skeleton";
import s from "./ProfileInfoHeader.module.scss";

const ProfileInfoHeaderSkeleton: FC = () => {
    return <Skeleton className={s.skeleton} />;
};

export default ProfileInfoHeaderSkeleton;
