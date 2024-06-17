import { DateString } from "../../../../models/AliasTypes";

export type CalendarEvent = {
    id: string;
    calendarId: string;
    title: string;
    body: string;
    start: DateString;
    end: DateString;
};
