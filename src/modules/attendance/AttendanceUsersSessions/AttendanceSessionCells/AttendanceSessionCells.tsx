import s from "./AttendanceSessionCells.module.scss";
import classNames from "classnames";
import { getStringNumber } from "Helpers/GetPublishDateString";
import { getUserDateShortString, getUserDateString } from "Helpers/GetUserDateString";

interface AttendanceUserSessionProps {
    className?: string;
    fromDate: Date;
    toDate: Date;
}

const numOfCells = 12;

enum cellType {
    default = "default",
    left = "left",
    right = "right",
}

const getCellStyle = (type: cellType, index: number, fromHours: number, toHours: number) => {
    const tenthCellFrom = (fromHours % 2) / 2;
    const tenthCellTo = (toHours % 2) / 2;
    console.log(type);
    if (type === cellType.default) {
        return {
            left: `${index * 42}px`,
            width: `36px`,
        };
    }
    if (type === cellType.left)
        return {
            left: `${index * 42}px`,
            width: `${(1 - tenthCellFrom) * 36}px`,
            transform: `translateX(${tenthCellFrom * 36}px)`,
            borderRadius: `0 4px 4px 0`,
        };
    return {
        left: `${index * 42}px`,
        width: `${tenthCellTo * 36}px`,
        borderRadius: `4px 0 0 4px`,
    };
};

const generateCellArray = (fromHours: number, toHours: number, isTimeline?: boolean) => {
    let cellArray = [];
    const startIndex = Math.floor(fromHours / 2);
    const endIndex = Math.ceil(toHours / 2);
    console.log(fromHours, toHours);

    for (let i = 0; i < numOfCells; i++) {
        cellArray.push(
            <li
                key={i}
                className={s.sessionCell}
            >
                {isTimeline && <p className={s.sessionCellTime}>{`${getStringNumber(i * 2)}:00`}</p>}
            </li>
        );
    }
    for (let i = startIndex; i < endIndex; i++) {
        let type: cellType = cellType.default;
        if (i === startIndex && fromHours !== 0) type = cellType.left;
        if (i === endIndex - 1 && toHours !== 23.999) type = cellType.right;
        cellArray.push(
            <li
                style={getCellStyle(type, i, fromHours, toHours)}
                key={`${i} active`}
                className={classNames(s.sessionCellActive, s.sessionCell)}
            ></li>
        );
    }
    return cellArray;
};

export const AttendanceSessionCells = (props: AttendanceUserSessionProps) => {
    const { className, fromDate, toDate } = props;

    const fromHours = fromDate.getHours() + fromDate.getMinutes() / 60;
    const toHours = toDate.getHours() + toDate.getMinutes() / 60;

    if (toHours < fromHours && fromDate.getTime() < toDate.getTime()) {
        return (
            <div className={classNames(s.attendanceSessionCellsContainer, className)}>
                <ul className={s.attendanceSessionCells}>
                    {generateCellArray(fromHours, 23.999, true)}
                    <li className={s.attendanceDateCell}>{getUserDateShortString(fromDate)}</li>
                </ul>
                <ul className={classNames(s.attendanceSessionCells, s.attendanceSessionCellsSecond)}>
                    {generateCellArray(0, toHours)}
                    <li className={s.attendanceDateCell}>{getUserDateShortString(toDate)}</li>
                </ul>
            </div>
        );
    }

    return (
        <div className={classNames(s.attendanceSessionCellsContainer, className)}>
            <ul className={s.attendanceSessionCells}>
                {generateCellArray(fromHours, toHours, true)}
                <li className={s.attendanceDateCell}>{getUserDateShortString(fromDate)}</li>
            </ul>
        </div>
    );
};

export default AttendanceSessionCells;
