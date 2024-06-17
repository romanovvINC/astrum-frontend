import React, { FC } from "react";
import { Card } from "reactstrap";
import { Achievement } from "models/profile/Achivement";
import { getDefaultAvatar } from "Mocks/MockFunctions";
import { UserAvatar } from "Components/UserAvatar";

import s from "./AchievementCard.module.scss";
import classNames from "classnames";

const AchievementCard: FC<Achievement> = ({ iconUrl, name, description }) => {
    return (
        <div className={s.achievement_card}>
            <Card className={s.custom_card}>
                <UserAvatar
                    containerClassName={s.card_avatar}
                    avatarUrl={iconUrl ?? getDefaultAvatar()}
                />
                <h4 className={classNames("text-center profile-details", s.title)}>{name}</h4>
                <h6 className={classNames("text-center profile-details", s.description)}>{description}</h6>
            </Card>
        </div>
    );
};

export default AchievementCard;
