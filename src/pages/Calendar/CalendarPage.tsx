import { FC } from "react";
import "@toast-ui/calendar/dist/toastui-calendar.min.css";
import "tui-date-picker/dist/tui-date-picker.css";
import "tui-time-picker/dist/tui-time-picker.css";
import { CalendarPageContent } from "modules/calendar";


const CalendarPage: FC = () => {
    return (
            <CalendarPageContent/>
    );
};

export default CalendarPage;
