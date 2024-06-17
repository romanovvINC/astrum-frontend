import { createSlice } from "@reduxjs/toolkit";
import { Calendar } from "./Types/Calendar";
import { CalendarEvent } from "./Types/CalendarEvent";
import {
    EditCalendarEventFailure,
    EditCalendarEventRequest,
    EditCalendarEventSuccess,
} from "./Types/ActionTypes/EditCalendarEventTypes";
import {
    AddCalendarEventFailure,
    AddCalendarEventRequest,
    AddCalendarEventSuccess,
} from "./Types/ActionTypes/AddCalendarEventTypes";
import { AddCalendarFailure, AddCalendarRequest, AddCalendarSuccess } from "./Types/ActionTypes/AddCalendarTypes";
import {
    DeleteCalendarEventFailure,
    DeleteCalendarEventRequest,
    DeleteCalendarEventSuccess,
} from "./Types/ActionTypes/DeleteCalendarEventTypes";

interface ICalendarState {
    calendars: Calendar[];
    currentCalendars: Calendar[];
    events: CalendarEvent[];
    currentEvents: CalendarEvent[];
    pending: boolean;
    calendarError: string | null;
}

const defaultState: ICalendarState = {
    calendars: [],
    currentCalendars: [],
    events: [],
    currentEvents: [],
    pending: false,
    calendarError: null,
};

export const CalendarReducer = createSlice({
    name: "calendar",
    initialState: defaultState,
    reducers: {
        getCalendarsRequest(state) {
            state.pending = true;
        },

        getCalendarsSuccess(state, action) {
            state.pending = false;
            state.calendarError = null;
            state.calendars = action.payload.calendars;
            state.currentCalendars = action.payload.calendars;
            state.events = action.payload.events;
            state.currentEvents = action.payload.events;
        },

        getCalendarsFailure(state, action) {
            state.pending = false;
            state.calendarError = action.payload;
        },

        addCalendarRequest(state, action) {
            state.pending = true;
        },

        addCalendarSuccess(state, action: AddCalendarSuccess) {
            state.pending = false;
            state.calendars.push(action.payload);
            state.currentCalendars.push(action.payload);
        },

        addCalendarFailure(state, action: AddCalendarFailure) {
            state.pending = false;
            state.calendarError = action.payload;
        },

        addCalendarEventRequest(state, action: AddCalendarEventRequest) {
            state.pending = true;
        },

        addCalendarEventSuccess(state, action: AddCalendarEventSuccess) {
            state.pending = false;
            state.calendarError = null;
            state.events.push(action.payload);
            if (state.currentCalendars.some(c => c.id === action.payload.calendarId))
                state.currentEvents.push(action.payload);
        },

        addCalendarEventFailure(state, action: AddCalendarEventFailure) {
            state.pending = false;
            state.calendarError = action.payload;
        },

        editCalendarEventRequest(state, action: EditCalendarEventRequest) {
            state.pending = true;
        },

        editCalendarEventSuccess(state, action: EditCalendarEventSuccess) {
            state.pending = false;
            const index = state.events.findIndex(ev => ev.id === action.payload.id);
            const currentIndex = state.currentEvents.findIndex(ev => ev.id === action.payload.id);
            if (index !== -1) state.events[index] = action.payload;
            if (currentIndex !== -1) state.currentEvents[currentIndex] = action.payload;
        },

        editCalendarEventFailure(state, action: EditCalendarEventFailure) {
            state.pending = false;
            state.calendarError = action.payload;
        },

        deleteCalendarEventRequest(state, action: DeleteCalendarEventRequest) {
            state.pending = true;
        },

        deleteCalendarEventSuccess(state, action: DeleteCalendarEventSuccess) {
            state.pending = false;
            state.events = state.events.filter(ev => ev.id !== action.payload);
            state.currentEvents = state.currentEvents.filter(ev => ev.id !== action.payload);
        },

        deleteCalendarEventFailure(state, action: DeleteCalendarEventFailure) {
            state.pending = false;
            state.calendarError = action.payload;
        },

        toggleCalendar(state, action) {
            const index = state.currentCalendars.findIndex(c => c.id === action.payload);
            if (index === -1) {
                const adddedIndex = state.calendars.findIndex(c => c.id === action.payload);
                state.currentCalendars.push(state.calendars[adddedIndex]);
                state.currentEvents = state.currentEvents.concat(
                    state.events.filter(ev => ev.calendarId === action.payload)
                );
            } else {
                state.currentCalendars.splice(index, 1);
                state.currentEvents = state.currentEvents.filter(ev => ev.calendarId !== action.payload);
            }
        },

        closeErrorPopup(state) {
            state.calendarError = null;
        },
    },
});

export const {
    getCalendarsRequest,
    getCalendarsSuccess,
    getCalendarsFailure,
    addCalendarRequest,
    addCalendarSuccess,
    addCalendarFailure,
    addCalendarEventRequest,
    addCalendarEventSuccess,
    addCalendarEventFailure,
    editCalendarEventRequest,
    editCalendarEventSuccess,
    editCalendarEventFailure,
    deleteCalendarEventRequest,
    deleteCalendarEventSuccess,
    deleteCalendarEventFailure,
    toggleCalendar,
    closeErrorPopup,
} = CalendarReducer.actions;

export default CalendarReducer.reducer;
