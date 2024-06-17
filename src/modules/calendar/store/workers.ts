import { EditCalendarEventRequest } from "./Types/ActionTypes/EditCalendarEventTypes";
import { AxiosResponse } from "axios";
import { call, put } from "redux-saga/effects";
import { addCalendar, addNewEvent, deleteEvent, editEvent } from "../api";
import {
    addCalendarEventFailure,
    addCalendarEventSuccess,
    addCalendarFailure,
    addCalendarSuccess,
    deleteCalendarEventFailure,
    deleteCalendarEventSuccess,
    editCalendarEventFailure,
    editCalendarEventSuccess,
} from "./index";
import { AddCalendarEventRequest } from "./Types/ActionTypes/AddCalendarEventTypes";
import { AddCalendarRequest } from "./Types/ActionTypes/AddCalendarTypes";
import { DeleteCalendarEventRequest } from "./Types/ActionTypes/DeleteCalendarEventTypes";
import { CalendarEvent } from "./Types/CalendarEvent";
import { convertCalendar, convertToCalendarEvent } from "../helpers/ConvertResponseHelpers";
import { CalendarResponse } from "./Types/CalendarResponse";
import { CalendarEventResponse } from "./Types/CalendarEventResponse";

export function* addCalendarWorker({ payload }: AddCalendarRequest) {
    try {
        const response: AxiosResponse<CalendarResponse> = yield call(addCalendar, payload);
        const calendar = convertCalendar(response.data);
        yield put(addCalendarSuccess(calendar));
    } catch (e) {
        yield put(addCalendarFailure((e as Error).message));
    }
}

export function* addCalendarEventWorker({ payload }: AddCalendarEventRequest) {
    try {
        const response: AxiosResponse<CalendarEventResponse> = yield call(addNewEvent, payload);
        const data = response.data;
        const event: CalendarEvent = convertToCalendarEvent(data);
        yield put(addCalendarEventSuccess(event));
    } catch (e) {
        yield put(addCalendarEventFailure((e as Error).message));
    }
}

export function* editCalendarEventWorker({ payload }: EditCalendarEventRequest) {
    try {
        const response: AxiosResponse<CalendarEventResponse> = yield call(editEvent, payload);
        const data = response.data;
        const event: CalendarEvent = convertToCalendarEvent(data);
        yield put(editCalendarEventSuccess(event));
    } catch (e) {
        yield put(editCalendarEventFailure((e as Error).message));
    }
}

export function* deleteCalendarEventWorker({ payload }: DeleteCalendarEventRequest) {
    try {
        const response: AxiosResponse<CalendarEventResponse> = yield call(deleteEvent, payload);
        yield put(deleteCalendarEventSuccess(response.data.id));
    } catch (e) {
        yield put(deleteCalendarEventFailure((e as Error).message));
    }
}
