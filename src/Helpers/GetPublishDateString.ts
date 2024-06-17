import { isPreviousDay, isSameDay } from "./DateTimeHelpers";
import { incilingMonth } from "../Constants/Months";

export const getStringNumber = (number: number) => {
    return number < 10 ? `0${number}` : `${number}`;
};

export const getPublishDateString = (publishDate: Date): string => {
    const currentDate = new Date();
    const hours = getStringNumber(publishDate.getHours());
    const minutes = getStringNumber(publishDate.getMinutes());
    if (isSameDay(publishDate, currentDate)) {
        return `Сегодня ${hours}:${minutes}`;
    } else if (isPreviousDay(publishDate)) {
        return `Вчера ${hours}:${minutes}`;
    } else {
        return `${publishDate.getDate()} ${incilingMonth[publishDate.getMonth()]} ${hours}:${minutes}`;
    }
};

export const getFormattedDateString = (date: Date): string => {
    const day = getStringNumber(date.getDate());
    const month = getStringNumber(date.getMonth() + 1);
    const hours = getStringNumber(date.getHours());
    const minutes = getStringNumber(date.getMinutes());
    return `${day}.${month}.${date.getFullYear()} ${hours}:${minutes}`;
};

export const getFormattedMinutesString = (min: number): string => {
    const res = new Intl.RelativeTimeFormat("ru").formatToParts(min, "minutes");
    res.splice(0, 1);
    return res.map(r => r.value).join(" ");
};
