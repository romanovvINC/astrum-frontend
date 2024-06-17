import { FC } from "react";
import { Col, Container, Row } from "reactstrap";
import { ProfileList, ProfileListFilter, profileSelectors } from "modules/profile";

import s from "./ProfileListPage.module.scss";

const ProfileListPage: FC = () => {
    return (
        <Container fluid={false}>
            <Row className={s.header_row}>
                <Col xl={12}>
                    <h1>Сотрудники</h1>
                </Col>
            </Row>
            <Row className={s.row}>
                <Col xl={"9 xl-70"}>
                    <ProfileList />
                </Col>
                <Col
                    xl={"3 xl-30"}
                    className={s.filter_col}
                >
                    <ProfileListFilter />
                </Col>
            </Row>
        </Container>
    );
};

export default ProfileListPage;
