import {
    addAppealCategoryWorker,
    addAppealWorker,
    deleteAppealCategoryWorker,
    deleteAppealWorker,
    editAppealCategoryWorker,
    editAppealWorker,
    getAppealCreatePageWorker,
} from "./Workers";
import { takeEvery } from "redux-saga/effects";

export function* getAppealCreatePageWatcher() {
    yield takeEvery("appeal/getAppealCreatePageRequest", getAppealCreatePageWorker);
}

export function* addAppealWatcher() {
    yield takeEvery("appeal/addAppealRequest", addAppealWorker);
}

export function* editAppealWatcher() {
    yield takeEvery("appeal/editAppealRequest", editAppealWorker);
}

export function* deleteAppealWatcher() {
    yield takeEvery("appeal/deleteAppealRequest", deleteAppealWorker);
}

export function* addAppealCategoryWatcher() {
    yield takeEvery("appeal/addAppealCategoryRequest", addAppealCategoryWorker);
}

export function* editAppealCategoryWatcher() {
    yield takeEvery("appeal/editAppealCategoryRequest", editAppealCategoryWorker);
}

export function* deleteAppealCategoryWatcher() {
    yield takeEvery("appeal/deleteAppealCategoryRequest", deleteAppealCategoryWorker);
}
