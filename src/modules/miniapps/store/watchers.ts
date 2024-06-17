import { all, call, takeEvery, takeLatest } from "redux-saga/effects";
import { getMiniAppInfoRequest, getMiniAppsListRequest } from "./index";
import { getMiniAppInfoWorker, getMiniAppsListWorker } from "./workers";

function* watchGetMiniAppsList() {
    yield takeLatest(getMiniAppsListRequest, getMiniAppsListWorker)
}

function* watchGetMiniAppInfo() {
    yield takeLatest(getMiniAppInfoRequest, getMiniAppInfoWorker)
}

export function* watchMiniApps() {
    yield all([
        call(watchGetMiniAppsList),
        call(watchGetMiniAppInfo)
    ])
}