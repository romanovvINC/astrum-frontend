import React, { FC, useEffect } from "react";
import { Col, Row } from "reactstrap";
import { useAppDispatch, useAppSelector } from "Redux/hooks";
import { getProfileAchievementListInfoRequest, profileSelectors } from "modules/profile";

import s from "./ProfileAchievementListHeader.module.scss";
import { authSelectors } from "modules/auth";

interface IProfileAchievementListHeaderProps {
    username: string;
}

const ProfileAchievementListHeader: FC<IProfileAchievementListHeaderProps> = ({ username }) => {
    const { username: accountUsername } = useAppSelector(authSelectors.getBasicInfo);
    const { username: currentUsername, name, surname } = useAppSelector(profileSelectors.getProfileAchievementListInfo);
    const dispatch = useAppDispatch();
    const isMyAchievements = accountUsername === username;

    useEffect(() => {
        if (!isMyAchievements && currentUsername !== username) {
            dispatch(getProfileAchievementListInfoRequest(username));
        }
    }, []);

    return (
        <Row>
            <Col xl={12}>
                <div className={s.title}>
                    <h2 style={{ fontWeight: 600 }}>
                        {isMyAchievements ? (
                            "Мои достижения"
                        ) : (
                            <>
                                <span style={{ fontWeight: 600 }}>Достижения</span> {name} {surname}
                            </>
                        )}
                    </h2>
                </div>
            </Col>
        </Row>
    );
};

export default ProfileAchievementListHeader;
