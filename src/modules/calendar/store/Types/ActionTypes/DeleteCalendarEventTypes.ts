import { ErrorString } from "../../../../../models/AliasTypes";

export type DeleteCalendarEventRequestPayload = {
    eventId: string;
};

export type DeleteCalendarEventRequest = {
    type: string;
    payload: DeleteCalendarEventRequestPayload;
};

export type DeleteCalendarEventSuccess = {
    type: string;
    payload: string;
};

export type DeleteCalendarEventFailure = {
    type: string;
    payload: ErrorString;
};
