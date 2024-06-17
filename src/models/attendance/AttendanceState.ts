import { AttendanceUserShortInfo } from "models/attendance/AttendanceUserShortInfo";
import { AttendanceUserSession } from "models/attendance/AttendanceUserSession";
import { AttendanceUserStatistics } from "models/attendance/AttendanceUserStatisticsTypes";

export enum attendanceSortType {
    BY_NAME_UP = "byNameUp",
    BY_NAMED_DOWN = "byNameDown",
    BY_HOURS_UP = "byCurrencyUp",
    BY_HOURS_DOWN = "byCurrencyDown",
    BY_EFFECTIVENESS_UP = "byEffectivenessUp",
    BY_EFFECTIVENESS_DOWN = "byEffectivenessDown",
}

export enum attendanceFilterType {
    THIS_WEEK = "thisWeek",
    THIS_MONTH = "thisMonth",
    LAST_MONTH = "lastMonth",
    LAST_THREE_MONTH = "lastThreeMonth",
}

export const attendanceFilterButtons: Record<attendanceFilterType, string> = {
    [attendanceFilterType.THIS_WEEK]: "Эта неделя",
    [attendanceFilterType.THIS_MONTH]: "Этот месяц",
    [attendanceFilterType.LAST_MONTH]: "Прошлый месяц",
    [attendanceFilterType.LAST_THREE_MONTH]: "Прошлые три месяца",
};

export type AttendanceState = {
    userAttendanceInfo: AttendanceUserSession | null;
    usersList: AttendanceUserShortInfo[];
    usersAttendanceInfo: AttendanceUserSession[];
    attendanceUserStatistics: AttendanceUserStatistics[];
    userAttendanceInfoIsLoading: boolean;
    usersListIsLoading: boolean;
    usersAttendanceInfoIsLoading: boolean;
    attendanceUserStatisticsIsLoading: boolean;
    errorUserAttendanceInfo: string | null;
    errorUsersAttendanceInfo: string | null;
    errorUsersList: string | null;
    errorUsersAttendanceStatistics: string | null;
    sortType: attendanceSortType;
    filterType: attendanceFilterType;
};
