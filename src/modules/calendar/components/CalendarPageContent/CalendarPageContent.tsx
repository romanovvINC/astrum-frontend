import React, { FC, useCallback, useEffect, useRef, useState } from "react";
import { Card, CardBody, Col, Container, Row } from "reactstrap";
import { useAppDispatch, useAppSelector } from "Redux/hooks";
import ToastCalendar from "@toast-ui/react-calendar";

import type { CalendarEventResponse } from "../../store/Types/CalendarEventResponse";
import type { CalendarResponse } from "../../store/Types/CalendarResponse";
import type { CalendarEvent } from "../../store/Types/CalendarEvent";
import type { TDateISO } from "../../store/Types/CalendarDate";
import type { Calendar } from "../../store/Types/Calendar";

import { getAllCalendars } from "modules/calendar";

import { getStringNumber } from "Helpers/GetPublishDateString";

import { convertToCalendarEvent } from "../../helpers/ConvertResponseHelpers";
import {
    addCalendarEventRequest,
    closeErrorPopup,
    editCalendarEventRequest,
    getCalendarsSuccess,
} from "modules/calendar";
import {
    DetailInfoPopover,
    CalendarHeader,
    AddCalendarPopup,
    SelectCalendarSidebar,
    CreateEventPopover,
    CalendarSkeleton,
} from "modules/calendar";
import { ModalLoading, ModalError } from "ui/Modal";

import s from "./CalendarPageContent.module.css";

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
// eslint-disable-next-line import/no-unresolved
import { SelectDateTimeInfo } from "@toast-ui/calendar/types/types/eventBus";

const CalendarPageContent: FC = () => {
    const { pending, calendars, currentCalendars, currentEvents, calendarError } = useAppSelector(
        state => state.CalendarReducer
    );
    const ref = useRef<ToastCalendar>(null);

    const [dataCalendars, setDataCalendars] = useState<any>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [isError, setIsError] = useState(false);
    const [start, setStart] = useState(ref.current?.getInstance()?.getDateRangeStart().toDate().toLocaleDateString());
    const [end, setEnd] = useState(ref.current?.getInstance()?.getDateRangeEnd().toDate().toLocaleDateString());
    const [requestStart, setRequestStart] = useState<TDateISO>(
        ref.current?.getInstance()?.getDateRangeStart().toDate().toISOString() as TDateISO
    );
    const [requestEnd, setRequestEnd] = useState<TDateISO>(
        ref.current?.getInstance()?.getDateRangeEnd().toDate().toISOString() as TDateISO
    );
    const [addCalendarOpen, setAddCalendarOpen] = useState(false);
    const [selectedEvent, setSelectedEvent] = useState<any | null>(null);
    const [selectedInterval, setSelectedInterval] = useState<{ start: Date; end: Date } | null>(null);
    const [popoverCreateTarget, setPopoverCreateTarget] = useState<HTMLDivElement | null>(null);
    const [popoverCreateIsOpen, setPopoverCreateIsOpen] = useState(false);
    const [popoverDetailIsOpen, setPopoverDetailIsOpen] = useState(false);
    const [popoverEditIsOpen, setPopoverEditIsOpen] = useState(false);
    const [selectedEventTarget, setSelectedEventTarget] = useState<HTMLDivElement | null>(null);

    const dispatch = useAppDispatch();

    useEffect(() => {
        setIsLoading(true);
        if (requestStart !== undefined && requestEnd !== undefined) {
            getAllCalendars(requestStart, requestEnd)
                .then(data => setDataCalendars(data))
                .then(d => console.log(d));
            setIsLoading(false);
        } else if (dataCalendars.status === "404") {
            setIsError(true);
        } else {
            setIsLoading(false);
        }
    }, [ref, requestStart, requestEnd, pending]);

    useEffect(() => {
        if (dataCalendars) {
            const calendars: Calendar[] = [];
            const events: CalendarEvent[] = [];
            setDates();
            dataCalendars.data?.forEach((cal: CalendarResponse) => {
                cal.events?.forEach((ev: CalendarEventResponse) => events.push(convertToCalendarEvent(ev)));

                calendars.push({
                    id: cal.id,
                    name: cal.summary,
                    backgroundColor: cal.backgroundColor,
                });
            });

            const sorted = events.sort((a, b): number => {
                return new Date(a.start).getTime() - new Date(b.start).getTime();
            });
            dispatch(getCalendarsSuccess({ calendars, events: sorted }));
        }
    }, [dataCalendars]);

    const setDates = useCallback(() => {
        setStart(ref.current?.getInstance()?.getDateRangeStart().toDate().toLocaleDateString());
        setRequestStart(ref.current?.getInstance()?.getDateRangeStart().toDate().toISOString() as TDateISO);
        setEnd(ref.current?.getInstance()?.getDateRangeEnd().toDate().toLocaleDateString());
        setRequestEnd(ref.current?.getInstance()?.getDateRangeEnd().toDate().toISOString() as TDateISO);
    }, []);

    useEffect(() => {
        setDates();
    }, [ref]);

    const clickPrevHandler = useCallback(() => {
        ref.current?.getInstance()?.prev();
        setDates();
    }, []);

    const clickNextHandler = useCallback(() => {
        ref.current?.getInstance()?.next();
        setDates();
    }, []);

    const clickTodayHandler = useCallback(() => {
        ref.current?.getInstance()?.today();
        setDates();
    }, []);

    const createNewEvent = useCallback(
        (e: { calendarId: string; title: string; start: Date; end: Date; description: string }) => {
            closeCreateEventPopover();
            ref.current?.getInstance()?.clearGridSelections();
            dispatch(
                addCalendarEventRequest({
                    calendarId: e.calendarId,
                    summary: e.title,
                    start: e.start,
                    end: e.end,
                })
            );
        },
        [selectedEvent]
    );

    const editEvent = useCallback((e: any) => {
        const changes = e.changes;
        const calendarEvent = e.event;
        ref.current?.getInstance()?.clearGridSelections();
        dispatch(
            editCalendarEventRequest({
                id: calendarEvent.id,
                calendarId: calendarEvent.calendarId,
                newCalendarId: changes.calendarId ?? calendarEvent.calendarId,
                summary: changes.title ?? e.event.title,
                start: changes.start !== undefined ? new Date(changes.start.d.d) : new Date(e.event.start.d.d),
                end: changes.end !== undefined ? new Date(changes.end.d.d) : new Date(e.event.end.d.d),
            })
        );
    }, []);

    const editEventFromPopoverHandler = useCallback(
        (event: { calendarId: string; title: string; start: Date; end: Date; description: string }) => {
            setPopoverEditIsOpen(false);
            dispatch(
                editCalendarEventRequest({
                    id: selectedEvent.id,
                    calendarId: selectedEvent.calendarId,
                    newCalendarId: event.calendarId,
                    summary: event.title,
                    start: event.start,
                    end: event.end,
                })
            );
        },
        [selectedEvent]
    );

    const closeErrorPopupHandler = useCallback(() => {
        dispatch(closeErrorPopup());
    }, []);

    const closeCreateEventPopover = useCallback(() => {
        ref.current?.getInstance()?.clearGridSelections();
        setPopoverCreateTarget(null);
        setPopoverCreateIsOpen(false);
    }, []);

    const closeSelectedEventPopover = useCallback(() => {
        setSelectedEvent(null);
        setSelectedEventTarget(null);
        setPopoverDetailIsOpen(false);
        setPopoverEditIsOpen(false);
    }, []);

    const selectDateHandler = (e: SelectDateTimeInfo) => {
        if (selectedEvent) {
            closeSelectedEventPopover();
        }
        setPopoverCreateIsOpen(true);
        setSelectedInterval({ start: e.start, end: e.end });
        setPopoverCreateTarget(e.nativeEvent?.target);
    };

    const clickEventHandler = (e: { event: any; nativeEvent: React.MouseEvent<HTMLDivElement> }) => {
        closeCreateEventPopover();
        if (e.event.id === selectedEvent?.id) {
            closeSelectedEventPopover();
        } else {
            //eslint-disable-next-line
            //@ts-ignore
            setSelectedEventTarget(e.nativeEvent.target);
            setSelectedEvent(e.event);
            setPopoverDetailIsOpen(true);
        }
    };

    const clickOutsidePopoversHandler = useCallback(() => {
        closeCreateEventPopover();
        closeSelectedEventPopover();
    }, []);

    return (
        <Container fluid={true}>
            {isLoading ? (
                <CalendarSkeleton />
            ) : isError ? (
                <div>{}</div>
            ) : (
                <Row>
                    <Col xl={9}>
                        <Card>
                            <CardBody className={s.calendar_card__body}>
                                <CalendarHeader
                                    start={start}
                                    end={end}
                                    onclickToday={clickTodayHandler}
                                    onClickNext={clickNextHandler}
                                    onClickPrev={clickPrevHandler}
                                />
                                <ToastCalendar
                                    ref={ref}
                                    height="700px"
                                    view="week"
                                    gridSelection={true}
                                    month={{
                                        dayNames: ["S", "M", "T", "W", "T", "F", "S"],
                                        visibleWeeksCount: 3,
                                    }}
                                    week={{
                                        startDayOfWeek: 1,
                                        dayNames: ["Вс", "Пн", "Вт", "Ср", "Чт", "Пт", "Сб"],
                                        taskView: false,
                                        eventView: ["time", "allday"],
                                    }}
                                    template={{
                                        timegridDisplayPrimaryTime({ time }) {
                                            return `${getStringNumber(time.getHours())}:${getStringNumber(
                                                time.getMinutes()
                                            )}`;
                                        },
                                    }}
                                    calendars={currentCalendars}
                                    events={currentEvents}
                                    onSelectDateTime={selectDateHandler}
                                    onClickEvent={clickEventHandler}
                                    onBeforeUpdateEvent={editEvent}
                                />
                            </CardBody>
                        </Card>
                    </Col>
                    <Col xl={3}>
                        <Card>
                            <CardBody>
                                <SelectCalendarSidebar
                                    calendars={calendars}
                                    onAddCalendar={setAddCalendarOpen}
                                />
                            </CardBody>
                        </Card>
                    </Col>
                </Row>
            )}
            <AddCalendarPopup
                addCalendarOpen={addCalendarOpen}
                setAddCalendarOpen={setAddCalendarOpen}
            />
            <ModalLoading isOpen={pending} />
            <ModalError
                isOpen={Boolean(calendarError)}
                error={calendarError!}
                onClose={closeErrorPopupHandler}
            />

            {selectedEventTarget && (
                <DetailInfoPopover
                    isOpen={popoverDetailIsOpen}
                    target={selectedEventTarget}
                    event={selectedEvent}
                    setPopoverEditIsOpen={setPopoverEditIsOpen}
                    setPopoverDetailIsOpen={setPopoverDetailIsOpen}
                    closeSelectedEventPopover={closeSelectedEventPopover}
                    clickOutsidePopoversHandler={clickOutsidePopoversHandler}
                />
            )}
            {popoverCreateTarget && selectedInterval && (
                <CreateEventPopover
                    isOpen={popoverCreateIsOpen}
                    target={popoverCreateTarget}
                    defaultStart={selectedInterval.start}
                    defaultEnd={selectedInterval.end}
                    onClickCreate={createNewEvent}
                    onClickCancel={closeCreateEventPopover}
                    onClickOutside={clickOutsidePopoversHandler}
                />
            )}
            {selectedEventTarget && popoverEditIsOpen && selectedEvent && (
                <CreateEventPopover
                    defaultStart={selectedEvent.start.toDate()}
                    defaultEnd={selectedEvent.end.toDate()}
                    defaultTitle={selectedEvent.title}
                    defaultDescription={selectedEvent.body}
                    defaultCalendarId={selectedEvent.calendarId}
                    isOpen={popoverEditIsOpen}
                    target={selectedEventTarget}
                    onClickCreate={editEventFromPopoverHandler}
                    onClickCancel={closeSelectedEventPopover}
                    onClickOutside={clickOutsidePopoversHandler}
                />
            )}
        </Container>
    );
};

export default CalendarPageContent;
