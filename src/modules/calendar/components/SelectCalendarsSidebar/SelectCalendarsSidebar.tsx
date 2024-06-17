import { FC, useEffect, useState, useCallback } from "react";
import { useAppDispatch } from "Redux/hooks";
import { Card, CardBody } from "reactstrap";

import { toggleCalendar } from "modules/calendar";

import Button from "../../../../ui/Button/ButtonSecondary/ButtonSecondary";
import ButtonMain from "../../../../ui/Button/ButtonMain/ButtonMain";
import Checkbox from "./Checkbox/Checkbox";

import s from "./SelectCalendarsSidebar.module.css";

interface ISelectCalendarsSidebarProps {
    calendars: any[];
    onAddCalendar: (visible: boolean) => void;
}

const SelectCalendarsSidebar: FC<ISelectCalendarsSidebarProps> = ({ calendars, onAddCalendar }) => {
    const [activeCalendars, setActiveCalendars] = useState<boolean[]>([]);

    const dispatch = useAppDispatch();

    useEffect(() => {
        setActiveCalendars(calendars.map(() => true));
    }, [calendars]);

    const toggleCalendarHandler = useCallback((id: number) => {
        dispatch(toggleCalendar(id));
    }, []);

    const setVisibleCalendar = () => {
        onAddCalendar(true)
    }

    const handleClick = (id: number, index: number) => {
        const copy = [...activeCalendars];
        copy[index] = !copy[index];
        setActiveCalendars(copy);
        toggleCalendarHandler(id);
    };

    return (
        // <Card>
        //     <CardBody>
        <>
        
            <div className={s.sidebar_content}>
                <header className={s.header}>Календари</header>
                <ul className={s.calendar_list}>
                    {calendars.map((cal, i) => {
                        return (
                            <li key={cal.id}>
                                <Checkbox
                                    label={cal.name}
                                    checked={activeCalendars[i]}
                                    color={cal.backgroundColor}
                                    onClick={() => handleClick(cal.id, i)}
                                />
                            </li>
                        );
                    })}
                </ul>
            </div>
            <ButtonMain onClick={setVisibleCalendar}>Добавить календарь</ButtonMain>
        </>
    );
};
{
    /*    </CardBody>*/
}
{
    /*</Card>*/
}
// <div className={s.sidebar}>
//     <div className={s.sidebar_content}>
//         <header className={s.header}>Календари</header>
//         <ul className={s.calendar_list}>
//             {calendars.map((cal, i) => {
//                 return (
//                     <li key={cal.id}>
//                         <Checkbox
//                             label={cal.name}
//                             checked={activeCalendars[i]}
//                             color={cal.backgroundColor}
//                             onClick={() => handleClick(cal.id, i)}
//                         />
//                     </li>
//                 );
//             })}
//         </ul>
//     </div>
//     <Button
//         className={s.add_calendar_button}
//         onClick={onAddCalendar}
//     >
//         Добавить календарь
//     </Button>
// </div>
//     );
// };

export default SelectCalendarsSidebar;
