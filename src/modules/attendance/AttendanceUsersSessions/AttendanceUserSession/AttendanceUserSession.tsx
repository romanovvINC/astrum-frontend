import s from "./AttendanceUserSession.module.scss";
import { useTranslation } from "react-i18next";

interface AttendanceUserSessionProps {
    className?: string;
}

export const AttendanceUserSession = (props: AttendanceUserSessionProps) => {
    const { className } = props;

    const { t } = useTranslation();

    return <div className={s.AttendanceUserSession}></div>;
};
