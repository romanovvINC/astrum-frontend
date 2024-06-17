import React, { FC, useEffect } from "react";
import { Row } from "reactstrap";
import { useAppDispatch, useAppSelector } from "Redux/hooks";
import { getProfileListRequest, profileSelectors } from "modules/profile";
import { ProfileCard, ProfileCardSkeleton } from "modules/profile/components/ProfileList/ProfileCard";

import s from "./ProfileList.module.scss";

const ProfileList: FC = () => {
    const {
        pendingList,
        profileList: { filter },
    } = useAppSelector(profileSelectors.getProfileState);
    const { users } = useAppSelector(profileSelectors.getProfileListInfo);
    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(getProfileListRequest(filter));
    }, [filter]);

    if (pendingList && users.length === 0) {
        return (
            <Row className={s.cards}>
                <ProfileCardSkeleton />
                <ProfileCardSkeleton />
                <ProfileCardSkeleton />
                <ProfileCardSkeleton />
            </Row>
        );
    }

    return (
        <Row className={s.cards}>
            {pendingList ? (
                <div>Загрузка...</div>
            ) : users.length === 0 ? (
                <h2>Нет данных</h2>
            ) : (
                users.map(user => (
                    <div key={user.userId}>
                        <ProfileCard {...user} />
                    </div>
                ))
            )}
        </Row>
    );
};

export default ProfileList;
