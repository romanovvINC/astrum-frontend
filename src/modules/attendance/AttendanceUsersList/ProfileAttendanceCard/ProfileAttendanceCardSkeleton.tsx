import { FC } from "react";
import { Card, CardFooter, CardHeader } from "reactstrap";
import Skeleton from "react-loading-skeleton";

import s from "./ProfileAttendanceCard.module.scss";
import classNames from "classnames";

const ProfileAttendanceCardSkeleton: FC = () => {
    return (
        <div
            className={s.employee_card}
            style={{ height: "100%" }}
        >
            <Card
                className={classNames("custom-card", s.card_body, s.skeleton)}
                style={{ height: "100%" }}
            >
                <CardHeader></CardHeader>
                <Skeleton
                    circle={true}
                    containerClassName={s.skeleton_avatar__container}
                    className={s.skeleton_avatar}
                />
                <Skeleton className={s.name} />
                <ul className={classNames("simple-list", "card-social", "flex-row", s.social_network__list)}>
                    <Skeleton containerClassName={s.social_network__item} />
                    <Skeleton containerClassName={s.social_network__item} />
                    <Skeleton containerClassName={s.social_network__item} />
                </ul>
                <CardFooter>
                    <div className={s.competencies__list}>
                        <Skeleton />
                        <Skeleton />
                        <Skeleton />
                    </div>
                </CardFooter>
            </Card>
        </div>
    );
};

export default ProfileAttendanceCardSkeleton;
