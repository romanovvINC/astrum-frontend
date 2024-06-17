export type TimelineInterval = {
    startTime: Date;
    endTime: Date;
    intervalType: number;
};

export type TimelineIntervalResponse = Pick<TimelineInterval, "intervalType"> & {
    startTime: string;
    endTime: string;
};

export enum TimelineIntervalType {
    available,
    messageOnly,
    unavailable,
}

export const TimelineIntervalName = {
    0: "Доступен",
    1: "Только сообщения",
    2: "Недоступен",
} as const;
