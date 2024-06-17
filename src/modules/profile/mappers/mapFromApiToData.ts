import { ProfileInfo, ProfileInfoResponse } from "models/profile/ProfileInfo";
import { ProfileEditInfoStateResponse } from "models/profile/ProfileEditInfoStateResponse";
import { ProfileEditInfo } from "models/profile/ProfileEditInfo";
import { ProfileShortInfo, ProfileShortInfoResponse } from "models/profile/ProfileShortInfo";
import { TimelineInterval, TimelineIntervalResponse } from "models/profile/TimelineInterval";
import { Post, PostResponse } from "models/post/Post";
import { ProfileTimeline, ProfileTimelineResponse } from "models/profile/ProfileTimeline";

const mapProfileTimelineIntervalResponseToData = (interval: TimelineIntervalResponse): TimelineInterval => {
    const resultStart = interval.startTime.startsWith("1.")
        ? new Date(`0001-01-01T${interval.startTime.replace("1.", "")}`)
        : new Date(`0001-01-01T${interval.startTime}`);
    const resultEnd = interval.endTime.startsWith("1.")
        ? new Date(`0001-01-01T${interval.endTime.replace("1.", "")}`)
        : new Date(`0001-01-01T${interval.endTime}`);
    return {
        startTime: resultStart,
        endTime: resultEnd,
        intervalType: interval.intervalType,
    };
};

const mapProfileTimelineResponseToData = (timeline: ProfileTimelineResponse): ProfileTimeline => {
    return {
        timelineType: timeline.timelineType,
        intervals: timeline.intervals.map(mapProfileTimelineIntervalResponseToData),
    };
};

export const mapProfileInfoResponseToData = (profileInfoResponse: ProfileInfoResponse): ProfileInfo => {
    const { birthDate, userName, activeTimeline, timelines } = profileInfoResponse;
    const resultActiveTimeline = mapProfileTimelineResponseToData(activeTimeline);
    const resultTimelines = timelines.map(mapProfileTimelineResponseToData);
    return {
        ...profileInfoResponse,
        birthDate: birthDate ? new Date(birthDate) : null,
        username: userName,
        activeTimeline: resultActiveTimeline,
        timelines: resultTimelines,
    };
};

export const mapProfileEditInfoResponseToData = (profileEditInfo: ProfileEditInfoStateResponse): ProfileEditInfo => {
    const { address, competencies, activeTimeline, timelines } = profileEditInfo;
    const resultActiveTimeline = mapProfileTimelineResponseToData(activeTimeline);
    const resultTimelines: ProfileTimeline[] = timelines.map(mapProfileTimelineResponseToData);
    return {
        ...profileEditInfo,
        usernameIsExist: false,
        address: address ?? "",
        competencies: competencies ?? [],
        activeTimeline: resultActiveTimeline,
        timelines: resultTimelines,
    };
};

export const mapProfileShortInfoResponseToData = (profileShortInfo: ProfileShortInfoResponse): ProfileShortInfo => {
    const { positionId, positionName, birthDate, ...rest } = profileShortInfo;
    return {
        ...rest,
        position: positionName,
        birthDate: birthDate ? new Date(birthDate) : null,
    };
};

export const mapProfileShortInfoResponseListToData = (
    profileShortInfoList: ProfileShortInfoResponse[]
): ProfileShortInfo[] => {
    return profileShortInfoList.map(mapProfileShortInfoResponseToData);
};

export const mapPostResponseToData = (post: PostResponse): Post => {
    const { dateCreated, ...rest } = post;
    return {
        dateCreated: new Date(dateCreated),
        ...rest,
    };
};

export const mapPostResponseListToData = (posts: PostResponse[]): Post[] => {
    return posts.map(mapPostResponseToData);
};
