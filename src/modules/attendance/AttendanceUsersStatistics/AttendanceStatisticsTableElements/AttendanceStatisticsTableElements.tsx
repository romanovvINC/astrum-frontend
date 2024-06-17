import classNames from "classnames";
import s from "./AttendanceStatisticsTableElements.module.scss";
import { UserAvatar } from "Components/UserAvatar";
import { getDefaultAvatar } from "../../../../Mocks/MockFunctions";
import { Link } from "react-router-dom";
import { AttendanceUserStatistics } from "models/attendance/AttendanceUserStatisticsTypes";
import { attendanceFilterType } from "models/attendance/AttendanceState";
import { ReactComponent as MoneyIcon } from "assets/svg/money-icon.svg";
import { Collapse } from "reactstrap";

interface IAttendanceTableStats {
    stats: AttendanceUserStatistics[];
    filter: attendanceFilterType;
}

export const AttendanceUsersStatisticsTableElements = ({ stats, filter }: IAttendanceTableStats) => {
    return (
        <>
            <div className={classNames(s.tableTitle, s.tableElement)}>
                <h4></h4>
            </div>
            <div className={classNames(s.tableTitle, s.tableElement)}>
                <h4>Имя</h4>
            </div>
            <div className={classNames(s.tableTitle, s.tableElement)}>
                <h4>Роль</h4>
            </div>
            <div className={classNames(s.tableTitle, s.tableElement)}>
                <h4>
                    Время нахождения
                    <br /> в офисе
                </h4>
            </div>
            <div className={classNames(s.tableTitle, s.tableElement)}>
                <h4>
                    Количество
                    <br /> посещений офиса
                </h4>
            </div>
            <div className={classNames(s.tableTitle, s.tableElement, s.tableTitleLast)}>
                <h4>
                    Валюты <br />
                    зачислено
                </h4>
                <Collapse />
            </div>

            {stats.map((stat, index) => {
                if (!stat.currentStats) return <></>;
                const minutes = stat.currentStats.minutes;
                const last = index === stats.length - 1;
                console.log(last, index, stats.length);
                return (
                    <>
                        <div className={classNames(s.avatarCointainer, s.tableElement, last && s.lastTableElement)}>
                            <UserAvatar
                                width={56}
                                avatarUrl={getDefaultAvatar()}
                            />
                        </div>
                        <div className={classNames(s.tableUsername, s.tableElement, last && s.lastTableElement)}>
                            <Link to={`/attendance/${stat.user.id}`}>
                                <h5>{stat.user.name}</h5>
                            </Link>
                        </div>
                        <div className={classNames(s.tableRole, s.tableElement, last && s.lastTableElement)}>
                            <h6>{stat.user.function}</h6>
                        </div>
                        <div className={classNames(s.tableHours, s.tableElement, last && s.lastTableElement)}>
                            <h5>{`${Math.floor(minutes / 60)}ч. ${minutes % 60}м.`}</h5>
                        </div>
                        <div className={classNames(s.tableSessions, s.tableElement, last && s.lastTableElement)}>
                            <h5>{`${stat.currentStats.sessions} посещений офиса`}</h5>
                        </div>
                        <div className={classNames(s.tableCurrency, s.tableElement, last && s.lastTableElement)}>
                            <MoneyIcon />
                            <h5>{stat.currentStats.currency}</h5>
                        </div>
                    </>
                );
            })}
        </>
    );
};
