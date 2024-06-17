import { TimelineInterval, TimelineIntervalResponse } from "./TimelineInterval";

export const TimelineTypeName = {
    0: "Доступен",
    1: "В отпуске",
    2: "На больничном",
    3: "В командировке",
} as const;

export enum TimelineType {
    Available,
    Vacation,
    Sick,
    BusinessTrip,
}

export type ProfileTimeline = {
    timelineType: TimelineType;
    intervals: TimelineInterval[];
};

export type ProfileTimelineResponse = Omit<ProfileTimeline, "intervals"> & {
    intervals: TimelineIntervalResponse[];
};
