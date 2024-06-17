import { ErrorString } from "../../../../../models/AliasTypes";
import { Calendar } from "../Calendar";

export type AddCalendarRequestPayload = {
    summary: string;
};

export type AddCalendarRequest = {
    type: string;
    payload: AddCalendarRequestPayload;
};

export type AddCalendarSuccess = {
    type: string;
    payload: Calendar;
};

export type AddCalendarFailure = {
    type: string;
    payload: ErrorString;
};
