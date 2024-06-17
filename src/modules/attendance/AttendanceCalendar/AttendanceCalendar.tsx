import React, { FC, useCallback, useEffect, useRef, useState } from "react";
import { Card, CardBody, Col, Container, Row } from "reactstrap";
import { useAppDispatch, useAppSelector } from "Redux/hooks";
import ToastCalendar from "@toast-ui/react-calendar";

import { getAllCalendars } from "modules/calendar";

import { getStringNumber } from "Helpers/GetPublishDateString";

import { getCalendarsSuccess } from "modules/calendar";
import { CalendarHeader, CalendarSkeleton } from "modules/calendar";

import s from "./AttendanceCalendar.module.scss";

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
// eslint-disable-next-line import/no-unresolved
import { SelectDateTimeInfo } from "@toast-ui/calendar/types/types/eventBus";
import { TDateISO } from "modules/calendar/store/Types/CalendarDate";
import { CalendarResponse } from "modules/calendar/store/Types/CalendarResponse";
import { Calendar } from "modules/calendar/store/Types/Calendar";
import { CalendarEvent } from "modules/calendar/store/Types/CalendarEvent";
import { convertToCalendarEvent } from "modules/calendar/helpers/ConvertResponseHelpers";
import { CalendarEventResponse } from "modules/calendar/store/Types/CalendarEventResponse";
import { profileSelectors } from "modules/profile";
import { UserAvatar } from "Components/UserAvatar";

const calendarEventsMock: CalendarEvent[] = [
    {
        body: "",
        calendarId: "",
        end: "2024-03-25T12:05:00Z",
        id: "bd51a4f0-f3bf-4a0c-826f-f8c190e1224e",
        start: "2024-03-25T02:45:00Z",
        title: "",
    },
    {
        body: "",
        calendarId: "",
        end: "2024-03-26T13:21:00Z",
        id: "bd51a4f0-f3bf-4a0c-826f-f8c190e1224e",
        start: "2024-03-26T03:05:00Z",
        title: "",
    },
    {
        body: "",
        calendarId: "",
        end: "2024-03-27T11:02:00Z",
        id: "bd51a4f0-f3bf-4a0c-826f-f8c190e1224e",
        start: "2024-03-27T03:02:00Z",
        title: "",
    },
    {
        body: "",
        calendarId: "",
        end: "2024-03-28T13:50:00Z",
        id: "bd51a4f0-f3bf-4a0c-826f-f8c190e1224e",
        start: "2024-03-28T03:10:00Z",
        title: "",
    },
    {
        body: "",
        calendarId: "",
        end: "2024-03-29T13:12:00Z",
        id: "bd51a4f0-f3bf-4a0c-826f-f8c190e1224e",
        start: "2024-03-29T03:00:00Z",
        title: "",
    },
];

const AttendanceCalendar: FC = () => {
    const { pending } = useAppSelector(state => state.CalendarReducer);
    const ref = useRef<ToastCalendar>(null);
    const { userId, username, name, surname, position, socialNetworks, achievements, avatarUrl } = useAppSelector(
        profileSelectors.getProfileInfo
    );
    console.log(useAppSelector(profileSelectors.getProfileAttendance));
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

    if (isLoading) {
        return <CalendarSkeleton isAttendanceCalendar />;
    }
    if (isError) return <div>{}</div>;
    return (
        <Container>
            <Row>
                <Col xl={9}>
                    <Card>
                        <CardBody className={s.calendar_card__body}>
                            <Row className={s.attendance_calendar__header}>
                                <Col
                                    xl="2"
                                    lg="12"
                                    md="7"
                                >
                                    <Row>
                                        <UserAvatar avatarUrl={avatarUrl} />
                                    </Row>
                                </Col>
                                <Col
                                    xl="10"
                                    lg="12"
                                    md="7"
                                >
                                    <Row>
                                        <h2>Иван Иванов</h2>
                                    </Row>
                                    <Row>
                                        <h4>Посещаемость</h4>
                                    </Row>
                                </Col>
                            </Row>
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
                                events={calendarEventsMock}
                                onSelectDateTime={selectDateHandler}
                            />
                        </CardBody>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
};

export default AttendanceCalendar;
