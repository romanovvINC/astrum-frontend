import React, { FC } from "react";
import { Container } from "reactstrap";
import { useParams } from "react-router-dom";
import { ProfileAchievementList, ProfileAchievementListHeader } from "modules/profile";

const ProfileAchievementListPage: FC = () => {
    const { username } = useParams();

    return (
        <Container fluid={false}>
            <ProfileAchievementListHeader username={username!} />
            <ProfileAchievementList username={username!} />
        </Container>
    );
};

export default ProfileAchievementListPage;
