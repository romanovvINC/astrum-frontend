import { TimelineInterval, TimelineIntervalType } from "models/profile/TimelineInterval";

export const isInsideInterval = (hours: number, interval: TimelineInterval) =>
    interval.startTime.getHours() <= hours &&
    (hours < interval.endTime.getHours() || interval.endTime.getHours() === 0);

export const calculateNextIntervalType = (interval: TimelineInterval): number => {
    if (interval.intervalType === 2) {
        return 0;
    } else {
        return interval.intervalType + 1;
    }
};

export const insertInterval = (newInterval: TimelineInterval, targetInterval: TimelineInterval): TimelineInterval[] => {
    return [
        {
            intervalType: targetInterval.intervalType,
            startTime: targetInterval.startTime,
            endTime: new Date(newInterval.startTime),
        },
        {
            ...newInterval,
        },
        {
            intervalType: targetInterval.intervalType,
            startTime: new Date(newInterval.endTime),
            endTime: targetInterval.endTime,
        },
    ];
};

export const mergeSameIntervals = (intervals: TimelineInterval[]): TimelineInterval[] => {
    const result: TimelineInterval[] = [];
    let resultInterval: TimelineInterval | null = null;
    intervals.forEach(interval => {
        if (
            interval.intervalType === TimelineIntervalType.available ||
            result.some(i => i.startTime.getHours() === interval.startTime.getHours()) ||
            interval.startTime.getHours() === interval.endTime.getHours()
        ) {
            return;
        }
        if (!resultInterval) {
            resultInterval = interval;
            return;
        }
        if (resultInterval.intervalType === interval.intervalType) {
            if (resultInterval.endTime.getHours() === interval.startTime.getHours()) {
                resultInterval.endTime = interval.endTime;
            } else if (resultInterval.startTime.getHours() === interval.startTime.getHours()) {
                return;
            } else {
                result.push(resultInterval);
                resultInterval = interval;
            }
        } else {
            result.push(resultInterval);
            resultInterval = interval;
        }
    });
    if (resultInterval) {
        result.push(resultInterval);
    }

    return result;
};

export const changeInterval = (interval: TimelineInterval, intervals: TimelineInterval[]): TimelineInterval[] => {
    const copyInterval = { ...interval };
    let result = [...intervals];
    const intervalIndex = result.findIndex(
        i =>
            i.startTime.getHours() === copyInterval.startTime.getHours() &&
            i.endTime.getHours() === copyInterval.endTime.getHours()
    );
    if (intervalIndex === -1) {
        const targetIntervalIndex = result.findIndex(i => isInsideInterval(copyInterval.startTime.getHours(), i));
        if (targetIntervalIndex === -1) {
            result.push(copyInterval);
        } else {
            const newIntervals = insertInterval(copyInterval, result[targetIntervalIndex]);
            result.splice(targetIntervalIndex, 1, ...newIntervals);
        }
        result = result.sort(compareStartTime);
    } else {
        result[intervalIndex] = copyInterval;
    }
    result = mergeSameIntervals(result);
    return result;
};

const compareStartTime = (a: TimelineInterval, b: TimelineInterval): -1 | 0 | 1 => {
    if (a.startTime.getHours() < b.startTime.getHours()) {
        return -1;
    } else if (a.startTime.getHours() > b.startTime.getHours()) {
        return 1;
    } else return 0;
};
