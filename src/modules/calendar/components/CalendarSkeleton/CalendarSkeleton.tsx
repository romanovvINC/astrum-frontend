import { FC } from "react";
import { Col, Row } from "reactstrap";

import Skeleton from "react-loading-skeleton";

import s from "./CalendarSkeleton.module.css";

interface ICalendarSkeleton {
    isAttendanceCalendar?: boolean;
}

const CalendarSkeleton: FC<ICalendarSkeleton> = ({ isAttendanceCalendar }: ICalendarSkeleton) => {
    return (
        <Row>
            <Col xl={9}>
                <Skeleton className={s.calendar} />
            </Col>
            {!isAttendanceCalendar ?? (
                <Col xl={3}>
                    <Skeleton className={s.sidebar} />
                </Col>
            )}
        </Row>
    );
};

export default CalendarSkeleton;
