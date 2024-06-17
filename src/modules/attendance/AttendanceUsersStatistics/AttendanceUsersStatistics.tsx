import s from "./AttendanceUsersStatistics.module.scss";
import classNames from "classnames";
import { useAppDispatch, useAppSelector } from "Redux/hooks";
import { useCallback, useEffect } from "react";
import { getUsersAttendanceStatisticsRequest, setUsersAttendanceFilterType } from "modules/attendance/store";
import { attendanceSelectors } from "modules/attendance";
import { attendanceFilterButtons, attendanceFilterType } from "models/attendance/AttendanceState";
import { ButtonMain } from "ui/Button";
import { AttendanceUsersStatisticsTableElements } from "./AttendanceStatisticsTableElements/AttendanceStatisticsTableElements";
import { AttendanceFilters } from "./AttendanceFilters/AttendanceFilters";

interface AttendanceUsersStatisticsProps {
    className?: string;
}

export const AttendanceUsersStatistics = (props: AttendanceUsersStatisticsProps) => {
    const { className } = props;
    const dispatch = useAppDispatch();
    const { attendanceUserStatistics, attendanceUserStatisticsIsLoading, sortType, filterType } = useAppSelector(
        attendanceSelectors.getAttendanceState
    );
    useEffect(() => {
        dispatch(getUsersAttendanceStatisticsRequest());
    }, [dispatch]);

    const changeFilter = useCallback(
        (type: string) => {
            dispatch(setUsersAttendanceFilterType(type as attendanceFilterType));
        },
        [dispatch]
    );

    console.log(attendanceFilterButtons);

    return (
        <div className={classNames(s.attendanceUsersStatistics, {}, [className])}>
            <div className={classNames(s.attendanceUsersStatisticsTable, {}, [])}>
                <AttendanceUsersStatisticsTableElements
                    stats={attendanceUserStatistics}
                    filter={filterType}
                />
            </div>
            <AttendanceFilters
                changeFilter={changeFilter}
                filterType={filterType}
            />
        </div>
    );
};
