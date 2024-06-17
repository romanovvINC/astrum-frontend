import { AxiosResponse } from "axios";

import type { DeleteCalendarEventRequestPayload } from "./store/Types/ActionTypes/DeleteCalendarEventTypes";
import type { EditCalendarEventRequestPayload } from "./store/Types/ActionTypes/EditCalendarEventTypes";
import type { AddCalendarEventRequestPayload } from "./store/Types/ActionTypes/AddCalendarEventTypes";
import type { AddCalendarRequestPayload } from "./store/Types/ActionTypes/AddCalendarTypes";
import type { TDateISO } from "./store/Types/CalendarDate";
import type { Calendar } from "./store/Types/Calendar";

import { CalendarEventResponse } from "./store/Types/CalendarEventResponse";
import { CalendarResponse } from "./store/Types/CalendarResponse";

import baseApi from "Api/BaseApi";

const baseApiUrl = "/calendar";

export const getAllCalendars = async (start: TDateISO, end: TDateISO): Promise<Calendar[]> => {
    return await baseApi.get(`${baseApiUrl}/${start}/${end}`);
};

export const addNewEvent = async (
    data: AddCalendarEventRequestPayload
): Promise<AxiosResponse<CalendarEventResponse>> => {
    return await baseApi.post(`${baseApiUrl}/event`, data);
};

export const editEvent = async (
    data: EditCalendarEventRequestPayload
): Promise<AxiosResponse<CalendarEventResponse>> => {
    return await baseApi.put(`${baseApiUrl}/event/${data.id}`, data);
};

export const deleteEvent = async (
    data: DeleteCalendarEventRequestPayload
): Promise<AxiosResponse<CalendarEventResponse>> => {
    return await baseApi.delete(`${baseApiUrl}/event/${data.eventId}`);
};

export const addCalendar = async (data: AddCalendarRequestPayload): Promise<AxiosResponse<CalendarResponse>> => {
    return await baseApi.post(`${baseApiUrl}/${data.summary}`, data);
};
