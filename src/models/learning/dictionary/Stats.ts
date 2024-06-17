import { PracticeType } from "./Practice";

export type StatsSummary = {
    userId: string;
    countCompleted: number;
    practices: StatsPractice[];
};

export type StatsPractice = {
    type: PracticeType;
    countCompleted: number;
};

export type StatsTests = {
    successRate: number;
    practiceType: number;
    lastTestsStats: LastTestsStat[];
};

export type LastTestsStat = {
    id: string;
    questionsCount: number;
    correct: number;
    wrong: number;
};

export type Stats = {
    summaryPending: boolean;
    testsPending: boolean;
    error: string | null;
    summary: {
        countCompleted: number;
        practices: StatsPractice[];
    };
    tests: StatsTests[];
};
