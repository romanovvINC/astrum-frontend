import s from "./AttendanceFilters.module.scss";
import { useTranslation } from "react-i18next";
import classNames from "classnames";
import { attendanceFilterButtons, attendanceFilterType } from "models/attendance/AttendanceState";
import { ButtonMain } from "ui/Button";

interface AttendanceFiltersProps {
    changeFilter: (type: string) => void;
    filterType: attendanceFilterType;
}

export const AttendanceFilters = ({ changeFilter, filterType }: AttendanceFiltersProps) => {
    return (
        <div className={s.attendanceFilters}>
            <h4>Фильрация по времени</h4>
            <ul className={s.attendanceFilterButtons}>
                {Object.entries(attendanceFilterButtons).map(filterButton => {
                    let active = false;
                    console.log(filterType, filterButton[0]);
                    if (filterButton[0] === (filterType as string)) active = true;
                    return (
                        <li
                            className={classNames(s.buttonFilter, active && s.buttonFilterActive)}
                            key={filterButton[0]}
                            onClick={() => changeFilter(filterButton[0])}
                        >
                            <h4>{filterButton[1]}</h4>
                        </li>
                    );
                })}
            </ul>
        </div>
    );
};
