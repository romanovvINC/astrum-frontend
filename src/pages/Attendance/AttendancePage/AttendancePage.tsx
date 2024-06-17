import React, { FC } from "react";
import { Col, Container, Row } from "reactstrap";

import s from "./AttendancePage.module.scss";
import { AttendanceUsersList, AttendanceUsersSessions, AttendanceUsersStatistics } from "modules/attendance";
import { Link, useLocation } from "react-router-dom";
import classNames from "classnames";
import { attendanceRoutes } from "models/attendance/attendanceRoute";

interface IAttendanceNavbar {
    type: attendanceRoutes;
    title: string;
    route: string;
    isLast?: boolean;
    active?: boolean;
}

interface IAttendancePage {
    type: attendanceRoutes;
}

const navbarList: IAttendanceNavbar[] = [
    {
        type: attendanceRoutes.USERS,
        title: "Все сотрудники",
        route: "/attendance/users",
    },
    {
        type: attendanceRoutes.STATISTICS,
        title: "Статистика посещаемости",
        route: "/attendance/statistics",
    },
    {
        type: attendanceRoutes.SESSIONS,
        title: "Рабочие сессии",
        route: "/attendance/sessions",
        isLast: true,
    },
];

const AttendanceNavbar = () => {
    const location = useLocation();
    if (location.pathname.includes("users")) {
        console.log("");
    }
    return (
        <ul className={s.attendanceNavbar}>
            {navbarList.map((item, index) => {
                let active = false;
                if (item.type === attendanceRoutes.USERS && location.pathname.includes("attendance/users"))
                    active = true;
                if (item.type === attendanceRoutes.SESSIONS && location.pathname.includes("attendance/sessions"))
                    active = true;
                if (item.type === attendanceRoutes.STATISTICS && location.pathname.includes("attendance/statistics"))
                    active = true;
                return (
                    <li
                        key={index}
                        className={classNames(
                            s.attendanceNavbarButton,
                            item.isLast && s.attendanceNavbarLast,
                            active && s.attendanceNavbarActive
                        )}
                    >
                        <Link
                            className={s.attendanceNavbarButtonLink}
                            to={item.route}
                        >
                            {item.title}
                        </Link>
                    </li>
                );
            })}
            ;
        </ul>
    );
};

const AttendancePage: FC<IAttendancePage> = ({ type }) => {
    return (
        <Container fluid={false}>
            <Row className={s.headerRow}>
                <Col
                    xl={12}
                    className={s.colNavbar}
                >
                    <AttendanceNavbar />
                </Col>
            </Row>
            <Row className={s.row}>
                <Col xl={"9 xl-70"}></Col>
                {type === attendanceRoutes.USERS ? (
                    <AttendanceUsersList />
                ) : type === attendanceRoutes.SESSIONS ? (
                    <AttendanceUsersSessions />
                ) : (
                    <AttendanceUsersStatistics />
                )}
            </Row>
        </Container>
    );
};

export default AttendancePage;
