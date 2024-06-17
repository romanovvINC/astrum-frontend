import { AttendanceUserShortInfo } from "models/attendance/AttendanceUserShortInfo";

export type AttendanceUserStatistics = {
    user: AttendanceUserShortInfo;
    statsThisWeek: AttendanceUserStat;
    statsThisMonth: AttendanceUserStat;
    statsLastMonth: AttendanceUserStat;
    statsLastThreeMonths: AttendanceUserStat;
    currentStats: AttendanceUserStat;
};

export type AttendanceUserStatisticsFiltered = {
    user: AttendanceUserShortInfo;
    statsThisWeek: AttendanceUserStat;
    statsThisMonth: AttendanceUserStat;
    statsLastMonth: AttendanceUserStat;
    statsLastThreeMonths: AttendanceUserStat;
};

export type AttendanceUserStat = {
    minutes: number;
    sessions: number;
    currency: number | null;
};
