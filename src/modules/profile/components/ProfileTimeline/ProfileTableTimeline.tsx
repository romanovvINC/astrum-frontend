import { FC, useCallback, useEffect, useMemo, useRef } from "react";
import { TimelineIntervalType, TimelineInterval } from "models/profile/TimelineInterval";
import { isInsideInterval } from "modules/profile/helpers/timeLineHelpers";

import classNames from "classnames";
import s from "./ProfileTimeline.module.scss";

const HOUR_STEP = 1;

const getHeaders = (step = 1) => {
    const res = [];
    for (let i = 0; i < 24; i += step) {
        res.push({
            hours: i,
            time: `${i}:00`,
        });
    }
    return res;
};

export const getCellData = (hours: number, intervals: TimelineInterval[]) => {
    for (const interval of intervals) {
        if (isInsideInterval(hours, interval)) {
            return {
                className: s[TimelineIntervalType[interval.intervalType]],
                intervalType: interval.intervalType,
            };
        }
    }
    return {
        className: s.available,
        intervalType: TimelineIntervalType.available,
    };
};

interface ITimelineProps {
    intervals: TimelineInterval[];
    considerCurrentDate?: boolean;
    cellWidth?: number;
    onClickCell?: (interval: TimelineInterval) => void;
}

const ProfileTableTimeline: FC<ITimelineProps> = ({
    intervals,
    considerCurrentDate = false,
    cellWidth = 70,
    onClickCell,
}) => {
    const headers = useMemo(() => getHeaders(HOUR_STEP), []);
    const scrollContainerRef = useRef<HTMLTableElement | null>(null);

    useEffect(() => {
        if (considerCurrentDate && scrollContainerRef.current) {
            const date = new Date();
            scrollContainerRef.current.scrollLeft = cellWidth * date.getHours();
        }
        function scrollHorizontally(e: any) {
            e.stopPropagation();
            e.preventDefault();
            const delta = Math.max(-1, Math.min(1, e.wheelDelta || -e.detail));
            if (scrollContainerRef.current) {
                scrollContainerRef.current.scrollLeft -= delta * cellWidth;
            }
        }

        // IE9, Chrome, Safari, Opera
        scrollContainerRef.current?.addEventListener("mousewheel", scrollHorizontally, { passive: false });
        // Firefox
        scrollContainerRef.current?.addEventListener("DOMMouseScroll", scrollHorizontally, { passive: false });

        return () => {
            scrollContainerRef.current?.removeEventListener("mousewheel", scrollHorizontally);
            scrollContainerRef.current?.removeEventListener("DOMMouseScroll", scrollHorizontally);
        };
    }, [cellWidth]);

    const mouseEnterHandler = useCallback(() => scrollContainerRef.current?.focus(), []);

    const mouseLeaveHandler = useCallback(() => scrollContainerRef.current?.blur(), []);

    return (
        <div
            onMouseEnter={mouseEnterHandler}
            onMouseLeave={mouseLeaveHandler}
            className={s.scroll_container}
            ref={scrollContainerRef}
        >
            <table>
                <thead>
                    <tr>
                        {headers.map(h => (
                            <th
                                key={h.time}
                                style={{ minWidth: cellWidth }}
                                className={s.col_header}
                            >
                                {h.time}
                            </th>
                        ))}
                    </tr>
                </thead>
                <tbody className={s.table_body}>
                    <tr className={s.body_row}>
                        {headers.map(h => {
                            const cellData = getCellData(h.hours, intervals);
                            return (
                                <td
                                    key={`cell-${h.time}-${cellData.intervalType}`}
                                    className={classNames(s.cell, { [s.clickable]: onClickCell }, cellData.className)}
                                    onClick={() =>
                                        onClickCell?.({
                                            intervalType: cellData.intervalType,
                                            startTime: new Date(0, 0, 0, h.hours, 0),
                                            endTime: new Date(0, 0, 0, h.hours + HOUR_STEP, 0),
                                        })
                                    }
                                />
                            );
                        })}
                    </tr>
                </tbody>
            </table>
        </div>
    );
};

export default ProfileTableTimeline;
