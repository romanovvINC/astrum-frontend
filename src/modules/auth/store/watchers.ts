import { all, call, takeEvery, takeLatest } from "redux-saga/effects";
import {
    changePasswordWorker,
    checkAuthWorker,
    loginWithGitlabWorker,
    loginWorker,
    logoutWorker,
    registrationWorker,
} from "./workers";
import {
    changePasswordRequest,
    checkAuthRequest,
    loginRequest,
    loginWithGitlabRequest,
    logoutRequest,
    registrationRequest,
} from "./index";

function* registrationWatcher() {
    yield takeLatest(registrationRequest, registrationWorker);
}

function* loginWatcher() {
    yield takeLatest(loginRequest, loginWorker);
}

function* loginWithGitlabWatcher() {
    yield takeLatest(loginWithGitlabRequest, loginWithGitlabWorker);
}

function* checkAuthWatcher() {
    yield takeLatest(checkAuthRequest, checkAuthWorker);
}

function* logoutWatcher() {
    yield takeLatest(logoutRequest, logoutWorker);
}

function* changePasswordWatcher() {
    yield takeEvery(changePasswordRequest, changePasswordWorker);
}

export function* authWatcher() {
    yield all([
        call(registrationWatcher),
        call(loginWatcher),
        call(loginWithGitlabWatcher),
        call(checkAuthWatcher),
        call(logoutWatcher),
        call(changePasswordWatcher),
    ]);
}
