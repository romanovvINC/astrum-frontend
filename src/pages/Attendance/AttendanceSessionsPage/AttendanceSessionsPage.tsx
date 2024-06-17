import { FC } from "react";
import { Col, Container, Row } from "reactstrap";

import s from "./AttendanceSessionsPage.module.scss";
import { AttendanceUsersSessions } from "modules/attendance";

const AttendanceSessionsPage: FC = () => {
    console.log("draw");
    return (
        <Container fluid={false}>
            <Row className={s.headerRow}>
                <Col xl={12}>
                    <h1>Рабочие сессии</h1>
                </Col>
            </Row>
            <Row className={s.row}>
                <Col xl={"9 xl-70"}></Col>
                <AttendanceUsersSessions />
            </Row>
        </Container>
    );
};

export default AttendanceSessionsPage;
