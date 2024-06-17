import { PracticeType } from "models/learning/dictionary/Practice";
import { StatsPractice, StatsTests } from "models/learning/dictionary/Stats";

export type GetStatsTestsRequestType = {
    userId: string;
    type: PracticeType;
};

export type GetStatsSummaryRequest = {
    type: string;
    payload: string;
};

export type GetStatsSummarySuccess = {
    type: string;
    payload: {
        countCompleted: number;
        practices: StatsPractice[];
    };
};

export type GetStatsSummaryFailure = {
    type: string;
    payload: string;
};

export type GetStatsTestsRequest = {
    type: string;
    payload: {
        userId: string;
        practiceTypes: PracticeType[];
    };
};

export type GetStatsTestsSuccess = {
    type: string;
    payload: StatsTests[];
};

export type GetStatsTestsFailure = {
    type: string;
    payload: string;
};
