import { DateString } from "models/AliasTypes";

export type CalendarEventResponse = {
    id: string;
    calendarId: string;
    summary: string | null;
    description: string;
    created: DateString;
    start: DateString;
    end: DateString;
};
