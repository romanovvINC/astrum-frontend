import { incilingMonth } from "../Constants/Months";
import { TZDate } from "@toast-ui/calendar";
import { getStringNumber } from "Helpers/GetPublishDateString";

export const getUserDateString = (date: Date | TZDate): string => {
    const dateNumber = date.getDate();
    const month = incilingMonth[date.getMonth()];
    const year = date.getFullYear();
    return `${dateNumber} ${month} ${year}`;
};

export const getUserDateShortString = (date: Date | TZDate): string => {
    const dateNumber = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();
    return `${getStringNumber(dateNumber)}-${getStringNumber(month)}-${year}`;
};

export const getUserTimeString = (date: Date | TZDate): string => {
    const hours = date.getHours();
    const minutes = date.getMinutes();
    return `${getStringNumber(hours)}:${getStringNumber(minutes)}`;
};

export const addHours = (date: Date, hours: number): Date => {
    return new Date(new Date(date).setHours(date.getHours() + hours));
};
