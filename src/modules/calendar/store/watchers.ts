import { takeEvery, takeLatest, all, call } from "redux-saga/effects";
import {
    addCalendarEventWorker,
    addCalendarWorker,
    deleteCalendarEventWorker,
    editCalendarEventWorker,
} from "./workers";

export function* addCalendarWatcher() {
    yield takeEvery("calendar/addCalendarRequest", addCalendarWorker);
}

export function* addCalendarEventWatcher() {
    yield takeEvery("calendar/addCalendarEventRequest", addCalendarEventWorker);
}

export function* editCalendarEventWatcher() {
    yield takeEvery("calendar/editCalendarEventRequest", editCalendarEventWorker);
}

export function* deleteCalendarEventWatcher() {
    yield takeEvery("calendar/deleteCalendarEventRequest", deleteCalendarEventWorker);
}

export function* calendarWatcher() {
    yield all([
        call(addCalendarWatcher),
        call(addCalendarEventWatcher),
        call(editCalendarEventWatcher),
        call(deleteCalendarEventWatcher),
    ]);
}
