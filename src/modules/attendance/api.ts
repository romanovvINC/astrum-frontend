import { AxiosResponse } from "axios";
import attendanceApi from "Api/AttendanceApi";
import { AttendanceUserShortInfo } from "models/attendance/AttendanceUserShortInfo";
import baseApi from "Api/BaseApi";
import { AttendanceUserSession } from "models/attendance/AttendanceUserSession";
import { UsersAttendancePayload } from "modules/attendance/store/actionTypes/GetUsersAttendanceTypes";
import { AttendanceUserStatistics } from "models/attendance/AttendanceUserStatisticsTypes";
import { usersStatistics } from "modules/attendance/AttendanceUsersStatistics/AttendanceUserStatisticsMock";

export const getAttendanceUsersList = (): Promise<AxiosResponse<AttendanceUserShortInfo[]>> => {
    const url = `/User/GetList`;
    return attendanceApi.get(url);
};

export const getUsersAttendanceInfo = ({
    fromDate,
    toDate,
}: UsersAttendancePayload): Promise<AxiosResponse<AttendanceUserSession[]>> => {
    const url = `/WorkingSession/GetSessions?fromDate=${fromDate}&toDate=${toDate}`;
    return attendanceApi.get(url);
};

export const getUsersAttendanceStatistics = async (): Promise<AttendanceUserStatistics[]> => {
    return await new Promise<AttendanceUserStatistics[]>((resolve, reject) => {
        setTimeout(() => {
            resolve(usersStatistics);
        }, 1500);
    });
};
