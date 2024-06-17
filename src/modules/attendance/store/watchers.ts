import { all, call, takeLatest } from "redux-saga/effects";
import {
    getUsersAttendanceRequest,
    getUsersAttendanceShortInfoRequest,
    getUsersAttendanceStatisticsRequest,
} from "./index";
import { getAttendanceUsersListWorker, getUsersAttendanceStatisticsWorker, getUsersAttendanceWorker } from "./workers";

function* watchGetAttendnaceUsersList() {
    yield takeLatest(getUsersAttendanceShortInfoRequest, getAttendanceUsersListWorker);
}

function* watchGetUsersAttendanceInfo() {
    yield takeLatest(getUsersAttendanceRequest, getUsersAttendanceWorker);
}

function* watchGetUsersAttendanceStatistics() {
    yield takeLatest(getUsersAttendanceStatisticsRequest, getUsersAttendanceStatisticsWorker);
}

export function* watchAttendance() {
    yield all([
        call(watchGetAttendnaceUsersList),
        call(watchGetUsersAttendanceInfo),
        call(watchGetUsersAttendanceStatistics),
    ]);
}
