// asdasd
import { AttendanceUserShortInfo } from "models/attendance/AttendanceUserShortInfo";

export type GetUsersAttendanceShortInfoRequest = {
    type: string;
};

export type GetUsersAttendanceShortInfoSuccess = {
    type: string;
    payload: AttendanceUserShortInfo[];
};

export type GetUsersAttendanceShortInfoFailure = {
    type: string;
    payload: string;
};
