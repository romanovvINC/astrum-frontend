import { Question } from "./Question";

export enum PracticeType {
    Flash = 0,
    TermDefs = 1,
    DefTerms = 2,
}

export type FlashCardsPractice = {
    id: string;
    termIds: string[];
};

export type Practice = {
    practiceId: string;
    type: number;
    questions: Question[];
    questionsCount: number;
};

export type CheckAnswer = {
    userId: string;
    questionId: string;
    checkingResult: boolean;
};
