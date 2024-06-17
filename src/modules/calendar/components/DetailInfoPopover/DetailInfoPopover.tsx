import { FC, useRef, useCallback } from "react";
import { Popover, PopoverBody } from "reactstrap";
import { useAppDispatch } from "Redux/hooks";
import { TZDate } from "@toast-ui/calendar";

import { ButtonMain } from "ui/Button";

import { deleteCalendarEventRequest } from "modules/calendar";

import { isSameDay } from "Helpers/DateTimeHelpers";
import { getStringNumber } from "Helpers/GetPublishDateString";
import { getUserDateString } from "Helpers/GetUserDateString";
import { useOnClickOutside } from "Helpers/Hooks/useClickOutside";

import s from "./DetailInfoPopover.module.css";


interface IDetailInfoPopoverProps {
    isOpen: boolean;
    target: string | HTMLElement;
    event: any;
    setPopoverEditIsOpen: (isOpen: boolean) => void;
    setPopoverDetailIsOpen: (isOpen: boolean) => void;
    closeSelectedEventPopover: () => void;
    clickOutsidePopoversHandler: () => void
}

const DetailInfoPopover: FC<IDetailInfoPopoverProps> = ({
    isOpen,
    target,
    event,
    setPopoverEditIsOpen,
    setPopoverDetailIsOpen,
    closeSelectedEventPopover,
    clickOutsidePopoversHandler
}) => {
    const ref = useRef(null);

    const dispatch = useAppDispatch();

    const clickEditEventHandler = useCallback(() => {
        setPopoverEditIsOpen(true);
        setPopoverDetailIsOpen(false);
    }, []);

    const clickDeleteEventHandler = () => {
        closeSelectedEventPopover();
        dispatch(deleteCalendarEventRequest({ eventId: event.id }));
        
    };

    useOnClickOutside(ref, clickOutsidePopoversHandler );

    return (
        <Popover
            className={s.detail_info_popover}
            target={target}
            isOpen={isOpen}
        >
            <div ref={ref}>
                <PopoverBody>
                    <h3>{event.title}</h3>
                    <DetailInfoTime
                        start={event.start}
                        end={event.end}
                    />
                    <div className={s.action_container}>
                        <ButtonMain onClick={clickEditEventHandler}>Изменить</ButtonMain>
                        <ButtonMain
                            variant={"invert"}
                            onClick={clickDeleteEventHandler}
                        >
                            Удалить
                        </ButtonMain>
                    </div>
                </PopoverBody>
            </div>
        </Popover>
    );
};

const DetailInfoTime: FC<{ start: TZDate; end: TZDate }> = ({ start, end }) => {
    const getFormattedDate = (date: Date | TZDate) => {
        const day = getStringNumber(date.getDate());
        const month = getStringNumber(date.getMonth());
        const hours = getStringNumber(date.getHours());
        const minutes = getStringNumber(date.getMinutes());
        return `${day}.${month} ${hours}:${minutes}`;
    };

    if (isSameDay(start, end)) {
        return (
            <div>
                <span>{getUserDateString(start)}</span>{" "}
                <span>
                    {getStringNumber(start.getHours())}:{getStringNumber(start.getMinutes())}
                </span>{" "}
                -{" "}
                <span>
                    {getStringNumber(end.getHours())}:{getStringNumber(end.getMinutes())}
                </span>
            </div>
        );
    } else {
        return (
            <div>
                <span>{getFormattedDate(start)}</span> - <span>{getFormattedDate(end)}</span>
            </div>
        );
    }
};

export default DetailInfoPopover;
