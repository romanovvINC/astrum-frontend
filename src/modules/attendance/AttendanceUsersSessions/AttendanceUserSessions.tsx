import s from "./AttendanceUserSessions.module.scss";
import { Image } from "ui/Image";
import React, { useEffect } from "react";
import DataTable from "react-data-table-component";
import { ProfileShortInfo } from "models/profile/ProfileShortInfo";
import { getDefaultAvatar } from "../../../Mocks/MockFunctions";
import { useAppDispatch, useAppSelector } from "Redux/hooks";
import { getUsersAttendanceRequest } from "modules/attendance/store";
import { attendanceSelectors } from "modules/attendance";
import { UserAvatar } from "Components/UserAvatar";
import AttendanceSessionCells from "modules/attendance/AttendanceUsersSessions/AttendanceSessionCells/AttendanceSessionCells";
import { AttendanceUserSession } from "models/attendance/AttendanceUserSession";
import classNames from "classnames";
import { addHours, getUserTimeString } from "Helpers/GetUserDateString";
import { usersMock } from "./sessionsMock";
import { Link } from "react-router-dom";

export enum EmployeeStatus {
    ONLINE = "ONLINE",
    IN_OFFICE = "IN_OFFICE",
}

export const EmployeStatusName = {
    [EmployeeStatus.ONLINE]: "Сейчас в офисе",
    [EmployeeStatus.IN_OFFICE]: "Был в офисе давно",
} as const;

export const AttendanceUsersSessions = () => {
    //const users = useAppSelector(attendanceSelectors.getAttendanceUserSessions);
    const users = usersMock;
    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(
            getUsersAttendanceRequest({
                fromDate: "2024-03-01T05:24:45Z",
                toDate: new Date().toISOString(),
            })
        );
        console.log("dispatch");
    }, [dispatch]);

    return (
        <div className={s.usersListAttendanceTable}>
            <div className={classNames(s.attendanceTableTitle)}></div>
            <div className={classNames(s.attendanceTableTitle)}>
                <h4>Имя</h4>
            </div>
            <div className={classNames(s.attendanceTableTitle)}>
                <h4>Роль</h4>
            </div>
            <div className={classNames(s.attendanceTableTitle)}>
                <h4>Таймлайн</h4>
            </div>
            <div className={classNames(s.attendanceTableTitle, s.attendanceTableTitleLast)}>
                <h4>Время в офисе</h4>
            </div>
            {users.map(session => {
                const fromDate = new Date(session.start);
                const toDate = session.end ? new Date(session.end) : addHours(fromDate, 8);

                const hoursDuration = Math.floor((toDate.getTime() - fromDate.getTime()) / 3600000);
                const minutesDuration = Math.floor(
                    (toDate.getTime() - fromDate.getTime()) / 60000 - hoursDuration * 60
                );

                return (
                    <>
                        <div className={classNames(s.avatarContainer, s.attendanceTableItem)}>
                            <UserAvatar
                                width={64}
                                avatarUrl={getDefaultAvatar()}
                                className={s.avatar}
                            />
                        </div>
                        <div className={classNames(s.attendanceTableName, s.attendanceTableItem)}>
                            <Link to={`/attendance/${session.user.id}`}>
                                <h5>{session.user.name}</h5>
                            </Link>
                        </div>
                        <div className={classNames(s.attendanceTableRole, s.attendanceTableItem)}>
                            <h6>{session.user.function}</h6>
                        </div>
                        <AttendanceSessionCells
                            className={s.attendanceTableItem}
                            fromDate={fromDate}
                            toDate={toDate}
                        />
                        <div className={classNames(s.attendanceTableDuration, s.attendanceTableItem)}>
                            <h6>
                                {`Был в офисе`}
                                <br />
                                {`с ${getUserTimeString(fromDate)} до ${getUserTimeString(toDate)}`}
                            </h6>
                            <h5>{`${hoursDuration}ч. ${minutesDuration}м.`}</h5>
                        </div>
                    </>
                );
            })}
        </div>
    );
};

export default AttendanceUsersSessions;
