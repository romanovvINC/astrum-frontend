import { CalendarEventResponse } from "./CalendarEventResponse";

export type CalendarResponse = {
    id: string;
    summary: string;
    backgroundColor: string;
    foregroundColor: string;
    events: CalendarEventResponse[];
};
