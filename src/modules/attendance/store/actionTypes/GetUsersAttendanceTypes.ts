// asdasd
import { AttendanceUserShortInfo } from "models/attendance/AttendanceUserShortInfo";
import { AttendanceUserSession } from "models/attendance/AttendanceUserSession";

export type UsersAttendancePayload = {
    fromDate: string;
    toDate: string;
};

export type GetUsersAttendanceRequest = {
    type: string;
    payload: UsersAttendancePayload;
};

export type GetUsersAttendanceSuccess = {
    type: string;
    payload: AttendanceUserSession[];
};

export type GetUsersAttendanceFailure = {
    type: string;
    payload: string;
};
