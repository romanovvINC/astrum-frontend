import { FC } from "react";
import { TimelineIntervalType, TimelineIntervalName } from "models/profile/TimelineInterval";

import classNames from "classnames";
import s from "./ProfileTimeline.module.scss";

const ProfileTimelineLegend: FC = () => {
    return (
        <ul className={s.legend__list}>
            {Object.entries(TimelineIntervalName).map(pair => {
                return (
                    <li
                        key={pair[0]}
                        className={s.legend}
                    >
                        <div className={classNames(s.indicator, s[TimelineIntervalType[Number(pair[0])]])} />
                        <span>{pair[1]}</span>
                    </li>
                );
            })}
        </ul>
    );
};

export default ProfileTimelineLegend;
