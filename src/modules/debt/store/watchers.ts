import { all, call, takeEvery, takeLatest } from "redux-saga/effects";
import { createDebtWorker, getDebtListWorker, getDebtUserListWorker } from "./workers";
import { createDebtRequest, getDebtListRequest, getDebtUserListRequest } from "./index";

function* watchDebtList() {
    yield takeLatest(getDebtListRequest, getDebtListWorker);
}

function* watchCreateDebt() {
    yield takeEvery(createDebtRequest, createDebtWorker);
}

function* watchGetDebtUserList() {
    yield takeLatest(getDebtUserListRequest, getDebtUserListWorker);
}

export function* watchDebt() {
    yield all([call(watchDebtList), call(watchCreateDebt), call(watchGetDebtUserList)]);
}
