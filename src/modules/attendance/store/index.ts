import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { attendanceFilterType, attendanceSortType, AttendanceState } from "models/attendance/AttendanceState";
import {
    GetUsersAttendanceShortInfoFailure,
    GetUsersAttendanceShortInfoRequest,
    GetUsersAttendanceShortInfoSuccess,
} from "modules/attendance/store/actionTypes/GetUserAttendanceShortInfoTypes";
import {
    GetUsersAttendanceFailure,
    GetUsersAttendanceRequest,
    GetUsersAttendanceSuccess,
} from "modules/attendance/store/actionTypes/GetUsersAttendanceTypes";
import {
    GetUsersAttendanceStatisticsFailure,
    GetUsersAttendanceStatisticsRequest,
    GetUsersAttendanceStatisticsSuccess,
} from "modules/attendance/store/actionTypes/GetUserAttendanceStatistics";
import { useAppDispatch, useAppSelector } from "Redux/hooks";
import { currencyCalculator } from "Helpers/CurrencyHelpers";

const initialState: AttendanceState = {
    userAttendanceInfo: null,
    usersAttendanceInfo: [],
    usersList: [],
    attendanceUserStatistics: [],
    userAttendanceInfoIsLoading: true,
    usersAttendanceInfoIsLoading: true,
    usersListIsLoading: true,
    attendanceUserStatisticsIsLoading: true,
    errorUserAttendanceInfo: null,
    errorUsersAttendanceInfo: null,
    errorUsersList: null,
    errorUsersAttendanceStatistics: null,
    sortType: attendanceSortType.BY_EFFECTIVENESS_UP,
    filterType: attendanceFilterType.THIS_WEEK,
};

export const attendanceReducer = createSlice({
    name: "attendance",
    initialState,
    reducers: {
        getUsersAttendanceShortInfoRequest(state, action: GetUsersAttendanceShortInfoRequest) {
            state.usersListIsLoading = true;
            state.errorUsersList = null;
        },
        getUsersAttendanceShortInfoSuccess(state, action: GetUsersAttendanceShortInfoSuccess) {
            state.usersListIsLoading = false;
            state.usersList = action.payload;
        },
        getUsersAttendanceShortInfoFailure(state, action: GetUsersAttendanceShortInfoFailure) {
            state.usersListIsLoading = false;
            state.errorUsersList = action.payload;
        },
        getUsersAttendanceRequest(state, action: GetUsersAttendanceRequest) {
            state.usersAttendanceInfoIsLoading = true;
            state.errorUsersAttendanceInfo = null;
        },
        getUsersAttendanceSuccess(state, action: GetUsersAttendanceSuccess) {
            state.usersAttendanceInfoIsLoading = false;
            state.usersAttendanceInfo = action.payload;
        },
        getUsersAttendanceFailure(state, action: GetUsersAttendanceFailure) {
            state.usersAttendanceInfoIsLoading = false;
            state.errorUsersAttendanceInfo = action.payload;
        },
        getUsersAttendanceStatisticsRequest(state, action: GetUsersAttendanceStatisticsRequest) {
            state.attendanceUserStatisticsIsLoading = true;
            state.errorUsersAttendanceInfo = null;
        },
        getUsersAttendanceStatisticsSuccess(state, action: GetUsersAttendanceStatisticsSuccess) {
            state.attendanceUserStatisticsIsLoading = false;
            let oldStats = action.payload;

            oldStats = oldStats.map(stat => {
                return {
                    user: stat.user,
                    statsThisWeek: {
                        minutes: stat.statsThisWeek.minutes,
                        sessions: stat.statsThisWeek.sessions,
                        currency: currencyCalculator(stat.statsThisWeek.minutes, stat.statsThisWeek.sessions),
                    },
                    statsThisMonth: {
                        minutes: stat.statsThisMonth.minutes,
                        sessions: stat.statsThisMonth.sessions,
                        currency: currencyCalculator(stat.statsThisMonth.minutes, stat.statsThisMonth.sessions),
                    },
                    statsLastMonth: {
                        minutes: stat.statsLastMonth.minutes,
                        sessions: stat.statsLastMonth.sessions,
                        currency: currencyCalculator(stat.statsLastMonth.minutes, stat.statsLastMonth.sessions),
                    },
                    statsLastThreeMonths: {
                        minutes: stat.statsLastThreeMonths.minutes,
                        sessions: stat.statsLastThreeMonths.sessions,
                        currency: currencyCalculator(
                            stat.statsLastThreeMonths.minutes,
                            stat.statsLastThreeMonths.sessions
                        ),
                    },
                    currentStats: {
                        minutes: stat.statsThisWeek.minutes,
                        sessions: stat.statsThisWeek.sessions,
                        currency: currencyCalculator(stat.statsThisWeek.minutes, stat.statsThisWeek.sessions),
                    },
                };
            });

            attendanceReducer.caseReducers.setUsersAttendanceFilterType(state);
            state.attendanceUserStatistics = oldStats.sort((a, b) => {
                if (a.currentStats.currency && b.currentStats.currency)
                    return b.currentStats.currency - a.currentStats.currency;
                return 0;
            });
            console.log(oldStats);
        },
        getUsersAttendanceStatisticsFailure(state, action: GetUsersAttendanceStatisticsFailure) {
            state.attendanceUserStatisticsIsLoading = false;
            state.errorUsersAttendanceStatistics = action.payload;
        },
        setUsersAttendanceSortType(state, action: PayloadAction<attendanceSortType>) {
            state.sortType = action.payload;
        },
        setUsersAttendanceFilterType(state, action?: PayloadAction<attendanceFilterType>) {
            state.filterType = action?.payload || attendanceFilterType.THIS_WEEK;
            state.attendanceUserStatistics.forEach((stat, index) => {
                switch (state.filterType) {
                    case attendanceFilterType.THIS_WEEK:
                        stat.currentStats = stat.statsThisWeek;
                        break;
                    case attendanceFilterType.THIS_MONTH:
                        stat.currentStats = stat.statsThisMonth;
                        break;
                    case attendanceFilterType.LAST_MONTH:
                        stat.currentStats = stat.statsLastMonth;
                        break;
                    case attendanceFilterType.LAST_THREE_MONTH:
                        stat.currentStats = stat.statsLastThreeMonths;
                        break;
                    default:
                        stat.currentStats = stat.statsThisWeek;
                }
            });
        },
    },
});

export const {
    getUsersAttendanceShortInfoRequest,
    getUsersAttendanceShortInfoSuccess,
    getUsersAttendanceShortInfoFailure,
    getUsersAttendanceRequest,
    getUsersAttendanceSuccess,
    getUsersAttendanceFailure,
    getUsersAttendanceStatisticsRequest,
    getUsersAttendanceStatisticsSuccess,
    getUsersAttendanceStatisticsFailure,
    setUsersAttendanceSortType,
    setUsersAttendanceFilterType,
} = attendanceReducer.actions;

export default attendanceReducer.reducer;
