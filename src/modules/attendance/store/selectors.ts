import { RootState } from "Redux/store";
import { AttendanceUserShortInfo } from "models/attendance/AttendanceUserShortInfo";
import { AttendanceUserSession } from "models/attendance/AttendanceUserSession";
import { AttendanceState } from "models/attendance/AttendanceState";
import { AttendanceUserStatistics } from "models/attendance/AttendanceUserStatisticsTypes";

export const attendanceSelectors = {
    getAttendanceUserSessions: (state: RootState): AttendanceUserSession[] =>
        state.AttendanceReducer.usersAttendanceInfo,
    getAttendanceUsersList: (state: RootState): AttendanceUserShortInfo[] => state.AttendanceReducer.usersList,
    getAttendanceUsersStatistics: (state: RootState): AttendanceUserStatistics[] =>
        state.AttendanceReducer.attendanceUserStatistics,
    getAttendanceState: (state: RootState): AttendanceState => state.AttendanceReducer,
};
