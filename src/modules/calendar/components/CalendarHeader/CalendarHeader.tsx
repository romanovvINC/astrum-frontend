import React, { FC } from "react";

import { ReactComponent as AngleLeftIcon } from "assets/angle-left.svg";
import { ReactComponent as AngleRightIcon } from "assets/angle-right.svg";

import { ButtonSecondary } from "ui/Button";

import s from "./CalendarHeader.module.css";

interface ICalendarHeaderProps {
    start?: string;
    end?: string;
    onclickToday: (e: React.MouseEvent) => void;
    onClickPrev: (e: React.MouseEvent) => void;
    onClickNext: (e: React.MouseEvent) => void;
}

const CalendarHeader: FC<ICalendarHeaderProps> = props => {
    const { start, end, onclickToday, onClickPrev, onClickNext } = props;
    return (
        <div className={s.calendar_header}>
            <ButtonSecondary
                className={s.today_button}
                onClick={onclickToday}
            >
                Сегодня
            </ButtonSecondary>
            <ButtonSecondary
                className={s.header_button}
                onClick={onClickPrev}
            >
                <AngleLeftIcon className={s.img} />
            </ButtonSecondary>
            <ButtonSecondary
                className={s.header_button}
                onClick={onClickNext}
            >
                <AngleRightIcon className={s.img} />
            </ButtonSecondary>
            {start && end && (
                <span>
                    {start} ~ {end}
                </span>
            )}
        </div>
    );
};

export default CalendarHeader;
