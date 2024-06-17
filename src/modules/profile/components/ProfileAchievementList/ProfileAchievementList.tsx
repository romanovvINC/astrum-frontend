import React, { FC, useEffect } from "react";
import { Col, Row } from "reactstrap";
import { useAppDispatch, useAppSelector } from "Redux/hooks";
import { getProfileAchievementListRequest, profileSelectors } from "modules/profile";
import { AchievementCard, AchievementCardSkeleton } from "./AchievementCard";

interface IProfileAchievementListProps {
    username: string;
}

const ProfileAchievementList: FC<IProfileAchievementListProps> = ({ username }) => {
    const {
        pendingAchievements,
        profileAchievementListInfo: { username: currentUsername, achievements },
    } = useAppSelector(profileSelectors.getProfileState);
    const dispatch = useAppDispatch();

    useEffect(() => {
        if (username !== currentUsername) {
            dispatch(getProfileAchievementListRequest(username));
        }
    }, []);

    if (pendingAchievements && achievements.length === 0) {
        return (
            <Row>
                <Col xl={3}>
                    <AchievementCardSkeleton />
                </Col>
                <Col xl={3}>
                    <AchievementCardSkeleton />
                </Col>
            </Row>
        );
    }

    return (
        <Row>
            {achievements.length === 0 ? (
                <h3 style={{ fontWeight: 400 }}>Нет достижений</h3>
            ) : (
                achievements.map(item => (
                    <Col
                        xl={3}
                        key={item.id}
                    >
                        <AchievementCard {...item} />
                    </Col>
                ))
            )}
        </Row>
    );
};

export default ProfileAchievementList;
