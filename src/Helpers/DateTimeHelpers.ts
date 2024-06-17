import { TZDate } from "@toast-ui/calendar";

export const isSameDay = (a: Date | TZDate, b: Date | TZDate): boolean => {
    return a.getFullYear() === b.getFullYear() && a.getMonth() === b.getMonth() && a.getDate() === b.getDate();
};

export const isPreviousDay = (date: Date): boolean => {
    const previousDay = new Date();
    previousDay.setDate(previousDay.getDate() - 1);
    return isSameDay(date, previousDay);
};

export const isValidDate = (d: object | null): d is Date => {
    return d !== null && d !== undefined && d instanceof Date && !isNaN(d.getMilliseconds());
};
