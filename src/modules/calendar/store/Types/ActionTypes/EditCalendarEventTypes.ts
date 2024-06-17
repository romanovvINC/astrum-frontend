import type { ErrorString } from "../../../../../models/AliasTypes";
import type { CalendarEvent } from "../CalendarEvent";

export type EditCalendarEventRequestPayload = {
    id: string;
    calendarId: string;
    newCalendarId?: string;
    summary: string;
    start: Date;
    end: Date;
};

export type EditCalendarEventRequest = {
    type: string;
    payload: EditCalendarEventRequestPayload;
};

export type EditCalendarEventSuccess = {
    type: string;
    payload: CalendarEvent;
};

export type EditCalendarEventFailure = {
    type: string;
    payload: ErrorString;
};
