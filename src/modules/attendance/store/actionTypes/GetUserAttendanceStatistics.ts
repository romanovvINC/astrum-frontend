// asdasd
import { AttendanceUserStatistics } from "models/attendance/AttendanceUserStatisticsTypes";

export type GetUsersAttendanceStatisticsRequest = {
    type: string;
};

export type GetUsersAttendanceStatisticsSuccess = {
    type: string;
    payload: AttendanceUserStatistics[];
};

export type GetUsersAttendanceStatisticsFailure = {
    type: string;
    payload: string;
};
