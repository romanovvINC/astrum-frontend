import { all, call, takeLatest } from "redux-saga/effects";
import { getNewsWorker } from "./Workers";
import { getNewsRequest } from "./FeedReducer";

function* getNewsWatcher() {
    yield takeLatest(getNewsRequest, getNewsWorker);
}

export function* feedWatcher() {
    yield all([call(getNewsWatcher)]);
}
