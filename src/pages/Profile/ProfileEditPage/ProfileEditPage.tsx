import React, { FC, useCallback, useEffect } from "react";
import { Col, Container, Row } from "reactstrap";
import { useAppDispatch, useAppSelector } from "Redux/hooks";
import { useNavigate } from "react-router-dom";
import { authSelectors } from "modules/auth";
import {
    getProfileEditInfoRequest,
    ProfileEditContactInfo,
    ProfileEditMainInfo,
    profileSelectors,
} from "modules/profile";
import { ButtonBack } from "ui/Button";
import { ModalLoading } from "ui/Modal";

const ProfileEditPage: FC = () => {
    const { username } = useAppSelector(authSelectors.getBasicInfo);
    const { pendingChange } = useAppSelector(profileSelectors.getProfileState);

    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        dispatch(getProfileEditInfoRequest());
    }, []);

    const goToProfile = useCallback(() => navigate(`/profile/${username}`), [username]);

    return (
        <Container fluid={false}>
            <Row>
                <Col>
                    <ButtonBack
                        breadcrumbsPaths={["Изменение профиля"]}
                        onClick={goToProfile}
                    />
                </Col>
            </Row>
            <Row>
                <Col xl={4}>
                    <ProfileEditMainInfo />
                </Col>
                <Col xl={8}>
                    <ProfileEditContactInfo />
                </Col>
            </Row>
            <ModalLoading isOpen={pendingChange} />
        </Container>
    );
};

export default ProfileEditPage;
