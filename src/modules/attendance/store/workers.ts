import { call, put, select } from "redux-saga/effects";
import { AxiosResponse } from "axios";
import {
    getUsersAttendanceFailure,
    getUsersAttendanceShortInfoFailure,
    getUsersAttendanceShortInfoSuccess,
    getUsersAttendanceStatisticsFailure,
    getUsersAttendanceStatisticsSuccess,
    getUsersAttendanceSuccess,
} from "modules/attendance/store/index";
import { getAttendanceUsersList, getUsersAttendanceInfo, getUsersAttendanceStatistics } from "modules/attendance/api";
import { AttendanceUserShortInfo } from "models/attendance/AttendanceUserShortInfo";
import { AttendanceUserSession } from "models/attendance/AttendanceUserSession";
import {
    GetUsersAttendanceRequest,
    UsersAttendancePayload,
} from "modules/attendance/store/actionTypes/GetUsersAttendanceTypes";
import { GetUsersAttendanceStatisticsRequest } from "modules/attendance/store/actionTypes/GetUserAttendanceStatistics";
import { AttendanceUserStatistics } from "models/attendance/AttendanceUserStatisticsTypes";
import { usersStatistics } from "modules/attendance/AttendanceUsersStatistics/AttendanceUserStatisticsMock";
import { getCategories } from "modules/article/api";

export function* getAttendanceUsersListWorker() {
    const res: AxiosResponse<AttendanceUserShortInfo[]> = yield call(getAttendanceUsersList);
    console.log(res);
    if (res) {
        yield put(getUsersAttendanceShortInfoSuccess(res.data));
    } else {
        yield put(getUsersAttendanceShortInfoFailure("Ошибка"));
    }
}

export function* getUsersAttendanceWorker({ payload }: GetUsersAttendanceRequest) {
    const res: AxiosResponse<AttendanceUserSession[]> = yield call(getUsersAttendanceInfo, payload);
    console.log(res);

    if (res) {
        yield put(getUsersAttendanceSuccess(res.data));
    } else {
        yield put(getUsersAttendanceFailure("Ошибка"));
    }
}

export function* getUsersAttendanceStatisticsWorker() {
    const res: AxiosResponse<AttendanceUserShortInfo[]> = yield call(getCategories);
    if (res) {
        yield put(getUsersAttendanceStatisticsSuccess(usersStatistics));
    } else {
        yield put(getUsersAttendanceShortInfoFailure("Ошибка"));
    }
}
