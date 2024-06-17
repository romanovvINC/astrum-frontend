import React, { FC } from "react";
import s from "../ProfileAttendance.module.scss";
import classNames from "classnames";

export enum EmployeeOfficeStatus {
    IN_OFFICE = "in_office",
    NOT_IN_OFFICE = "not_in_office",
}

interface IProfileAttendanceTimeProps {
    status: EmployeeOfficeStatus;
    time: Date;
}

const ProfileAttendanceTime: FC<IProfileAttendanceTimeProps> = ({ status, time }) => {
    if (status) {
        return (
            <div className={classNames([s.attendance_time, s[status]], "", [])}>
                <h6>
                    В офисе с <span>{`${time.getHours()}:${time.getMinutes()}`}</span>
                </h6>
            </div>
        );
    }
    return (
        <div className={classNames([s.attendance_time, s[status]], "", [])}>
            <h6>Вышел из офиса в {`${time.getHours()}:${time.getMinutes()}`}</h6>
        </div>
    );
};

export default ProfileAttendanceTime;
