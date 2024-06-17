import type { CalendarEventResponse } from "../store/Types/CalendarEventResponse";
import type { CalendarEvent } from "../store/Types/CalendarEvent";
import type { CalendarResponse } from "../store/Types/CalendarResponse";
import type { Calendar } from "../store/Types/Calendar";

export const convertCalendar = (calendarResponse: CalendarResponse): Calendar => {
    return {
        id: calendarResponse.id,
        name: calendarResponse.summary,
        backgroundColor: calendarResponse.backgroundColor,
    };
};

export const convertToCalendarEvent = (calendarEventResponse: CalendarEventResponse): CalendarEvent => {
    return {
        id: calendarEventResponse.id,
        calendarId: calendarEventResponse.calendarId,
        title: calendarEventResponse.summary ?? "",
        body: calendarEventResponse.description,
        start: calendarEventResponse.start,
        end: calendarEventResponse.end,
    };
};
