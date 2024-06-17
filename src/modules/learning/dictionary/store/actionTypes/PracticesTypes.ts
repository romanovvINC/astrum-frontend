import { FlashCardsPractice, Practice, CheckAnswer, PracticeType } from "models/learning/dictionary/Practice";

export type StartPracticeRequestType = {
    userId: string;
    type: number;
    questionsCount: number;
};

export type FinishPracticeRequestType = {
    practiceId: string;
    userId: string;
};

export type CheckAnswerRequestType = {
    userId: string;
    testQuestionId: string;
    testOptionId: string;
    position?: number;
};

export type StartPracticeRequest = {
    type: string;
    payload: StartPracticeRequestType;
};

export type StartPracticeFailure = {
    type: string;
    payload: string;
};

export type StartFlashCardsPracticeSuccess = {
    type: string;
    payload: FlashCardsPractice;
};

export type CheckAnswerRequest = {
    type: string;
    payload: CheckAnswerRequestType;
};

export type CheckAnswerSuccess = {
    type: string;
    payload: CheckAnswer;
};

export type CheckAnswerFailure = {
    type: string;
    payload: string;
};

export type FinishPracticeRequest = {
    type: string;
    payload: FinishPracticeRequestType;
};

export type FinishPracticeFailure = {
    type: string;
    payload: string;
};

export type StartPracticeSuccess = {
    type: string;
    payload: Practice;
};

export type SetPracticePositionType = {
    type: string;
    payload: number;
};

export type SetStartedPracticeType = {
    type: string;
    payload: PracticeType | null;
};

export type SetFinishedPracticeType = {
    type: string;
    payload: PracticeType | null;
};

export type SetCorrectAnswerOption = {
    type: string;
    payload: {
        questionId: string;
        answerId: string;
        result: boolean;
        rightAnswer?: string;
    };
};
