import { ProfileTimeline, ProfileTimelineResponse } from "models/profile/ProfileTimeline";
import { TimelineIntervalResponse } from "models/profile/TimelineInterval";

export const mapTimelineFromDataToApi = (timeline: ProfileTimeline): ProfileTimelineResponse => {
    const intervals: TimelineIntervalResponse[] = timeline.intervals.map(i => ({
        intervalType: i.intervalType,
        startTime: `${i.startTime.getHours()}:00`,
        endTime: `${i.endTime.getHours()}:00`,
    }));
    return {
        timelineType: timeline.timelineType,
        intervals,
    };
};
