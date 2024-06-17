import s from "./ProfileAttendanceList.module.scss";
import { Image } from "ui/Image";
import React, { useEffect } from "react";
import DataTable from "react-data-table-component";
import { ProfileShortInfo } from "models/profile/ProfileShortInfo";
import { getDefaultAvatar } from "../../../Mocks/MockFunctions";
import { useAppDispatch, useAppSelector } from "Redux/hooks";
import { getUsersAttendanceShortInfoRequest } from "modules/attendance/store";
import { attendanceSelectors } from "modules/attendance";
import { getProfileListRequest, profileSelectors } from "modules/profile";
import { Row } from "reactstrap";
import { ProfileCard, ProfileCardSkeleton } from "modules/profile/components/ProfileList/ProfileCard";
import ProfileAttendanceCard from "modules/attendance/AttendanceUsersList/ProfileAttendanceCard/ProfileAttendanceCard";
import ProfileAttendanceCardSkeleton from "modules/attendance/AttendanceUsersList/ProfileAttendanceCard/ProfileAttendanceCardSkeleton";
import { Link } from "react-router-dom";
import { AttendanceUserShortInfo } from "models/attendance/AttendanceUserShortInfo";

export enum EmployeeStatus {
    ONLINE = "ONLINE",
    IN_OFFICE = "IN_OFFICE",
}

export const EmployeStatusName = {
    [EmployeeStatus.ONLINE]: "Сейчас в офисе",
    [EmployeeStatus.IN_OFFICE]: "Был в офисе давно",
} as const;

const usersList: AttendanceUserShortInfo[] = [
    {
        name: "Igor Big",
        fingerId: 22,
        function: "Backend Developer",
        id: 1,
    },
    {
        name: "Dima",
        fingerId: 3,
        function: "Backend Developer",
        id: 3,
    },
    {
        name: "Nastya",
        fingerId: 7,
        function: "HR Manager",
        id: 4,
    },
    {
        name: "Igor Bolshoy",
        fingerId: 1,
        function: "Backend Developer",
        id: 2,
    },
    {
        name: "Igor Fuck",
        fingerId: 6,
        function: "Backend Developer",
        id: 5,
    },
    {
        name: "Dima Big",
        fingerId: 4,
        function: "Backend Developer",
        id: 6,
    },
    {
        name: "Anna",
        fingerId: 5,
        function: "Manager",
        id: 7,
    },
    {
        name: "Artem",
        fingerId: 8,
        function: "Repost Manager",
        id: 8,
    },
    {
        name: "Natasha",
        fingerId: 9,
        function: "Designer",
        id: 9,
    },
    {
        name: "Vitya",
        fingerId: 10,
        function: "Manager",
        id: 10,
    },
    {
        name: "Mitya",
        fingerId: 11,
        function: "Backend Developer",
        id: 11,
    },
    {
        name: "Valentin",
        fingerId: 12,
        function: "Backend Developer",
        id: 12,
    },
    {
        name: "Sasha",
        fingerId: 13,
        function: "Frontend Developer",
        id: 13,
    },
    {
        name: "Daniil Konovalov",
        fingerId: 14,
        function: "Security",
        id: 14,
    },
    {
        name: "Eugenue Yakupov",
        fingerId: 15,
        function: "Wine Developer",
        id: 15,
    },
    {
        name: "Anna Slave",
        fingerId: 16,
        function: "Slave",
        id: 16,
    },
];

export const AttendanceUsersList = () => {
    const { usersListIsLoading } = useAppSelector(attendanceSelectors.getAttendanceState);
    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(getUsersAttendanceShortInfoRequest());
    }, [dispatch]);

    if (usersListIsLoading && usersList.length === 0) {
        return (
            <Row className={s.cards}>
                <ProfileAttendanceCardSkeleton />
                <ProfileAttendanceCardSkeleton />
                <ProfileAttendanceCardSkeleton />
                <ProfileAttendanceCardSkeleton />
            </Row>
        );
    }

    return (
        <Row className={s.cards}>
            {usersListIsLoading ? (
                <div>Загрузка...</div>
            ) : usersList.length === 0 ? (
                <h2>Нет данных</h2>
            ) : (
                usersList.map(user => (
                    <div key={user.id}>
                        <ProfileAttendanceCard {...user} />
                    </div>
                ))
            )}
        </Row>
    );
};

export default AttendanceUsersList;
