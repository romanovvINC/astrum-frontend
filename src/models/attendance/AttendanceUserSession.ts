import { AttendanceUserShortInfo } from "models/attendance/AttendanceUserShortInfo";

export type AttendanceUserSession = {
    user: AttendanceUserShortInfo;
    date: string;
    start: string;
    end: string | null;
    checks: AttendanceUserCheck[];
    duration: string;
    status: number;
};

export type AttendanceUserCheck = {
    user: AttendanceUserShortInfo;
    userId: number;
    date: string;
    id: number;
};
