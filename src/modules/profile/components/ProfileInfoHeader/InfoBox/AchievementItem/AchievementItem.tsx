import { FC, useCallback, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { Image } from "ui/Image";
import { TooltipInfo } from "ui/TooltipInfo";

import classNames from "classnames";
import s from "./AchievementItem.module.scss";

interface ILastAchievementProps {
    id: string;
    name: string;
    username: string;
    description: string;
    className?: string;
    iconUrl: string;
}

const AchievementItem: FC<ILastAchievementProps> = ({ className, id, name, username, description, iconUrl }) => {
    const [popoverIsOpen, setPopoverIsOpen] = useState(false);
    const achievementRef = useRef(null);

    const toggle = useCallback(() => setPopoverIsOpen(prev => !prev), []);

    return (
        <>
            <Link
                ref={achievementRef}
                className={classNames(s.last_achievement, className)}
                to={`/profile/${username}/achievements`}
            >
                <Image
                    className={s.icon}
                    src={iconUrl}
                />
            </Link>
            <TooltipInfo
                isOpen={popoverIsOpen}
                header={name}
                text={description}
                placement={"bottom"}
                target={achievementRef}
                toggle={toggle}
            />
        </>
    );
};

export default AchievementItem;
