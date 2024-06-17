import React, { FC } from "react";
import { Card } from "reactstrap";
import Skeleton from "react-loading-skeleton";

import classNames from "classnames";
import s from "./AchievementCard.module.scss";

const AchievementCardSkeleton: FC = () => {
    return (
        <div className={classNames(s.achievement_card, s.skeleton)}>
            <Card className={s.custom_card}>
                <Skeleton
                    circle={true}
                    containerClassName={s.card_avatar}
                    className={s.skeleton__circle}
                />
                <Skeleton className={s.title} />
                <Skeleton
                    className={s.description}
                    count={2}
                />
            </Card>
        </div>
    );
};

export default AchievementCardSkeleton;
