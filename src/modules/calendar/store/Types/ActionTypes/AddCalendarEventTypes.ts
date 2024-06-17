import { ErrorString } from "../../../../../models/AliasTypes";
import { CalendarEvent } from "../CalendarEvent";
import { CalendarEventResponse } from "../CalendarEventResponse";

export type AddCalendarEventRequestPayload = {
    calendarId: string;
    summary: string;
    start: Date;
    end: Date;
};

export type AddCalendarEventSuccessResponsePayload = {
    data: CalendarEventResponse;
};

export type AddCalendarEventRequest = {
    type: string;
    payload: AddCalendarEventRequestPayload;
};

export type AddCalendarEventSuccess = {
    type: string;
    payload: CalendarEvent;
};

export type AddCalendarEventFailure = {
    type: string;
    payload: ErrorString;
};
