import React, { FC } from "react";
import { Card, CardBody } from "reactstrap";
import { useAppSelector } from "Redux/hooks";
import { TimelineTypeName } from "models/profile/ProfileTimeline";
import { profileSelectors } from "modules/profile";
import ProfileCardTimelineSkeleton from "./ProfileCardTimelineSkeleton";
import ProfileTableTimeline from "./ProfileTableTimeline";
import ProfileTimelineLegend from "./ProfileTimelineLegend";

const ProfileCardTimeline: FC = () => {
    const {
        pending,
        profileInfo: { activeTimeline },
    } = useAppSelector(profileSelectors.getProfileState);

    if (pending) {
        return <ProfileCardTimelineSkeleton />;
    }

    return (
        <Card>
            <CardBody>
                <h4>Таймлайн доступности</h4>
                <h5>Статус: {TimelineTypeName[activeTimeline.timelineType]}</h5>
                <ProfileTableTimeline
                    intervals={activeTimeline.intervals}
                    considerCurrentDate={true}
                />
                <ProfileTimelineLegend />
            </CardBody>
        </Card>
    );
};

export default ProfileCardTimeline;
