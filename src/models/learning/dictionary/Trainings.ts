import { Term } from "./Term";
import { Question } from "./Question";
import { PracticeType } from "./Practice";

export type FlashTraining = {
    pending: boolean;
    position: number;
    currentCard: Term;
    termIds: string[];
    correctAnswers: Term[];
    partlyAnswers: Term[];
    wrongAnswers: Term[];
    isFinished: boolean;
    isStarted: boolean;
    error: string | null;
    practiceId: string;
};

export type Training = {
    position: number;
    pending: boolean;
    startedPractice: PracticeType | null;
    finishedPractice: PracticeType | null;
    error: string | null;
    questions: Question[];
    practiceId: string;
    checkingResults: CheckingResult[];
    checkingPending: boolean;
    answeredPages: number[];
    correctAmount: number;
};

export type Trainings = {
    flash: FlashTraining;
    practice: Training;
};

export type CheckingResult = {
    result: boolean;
    questionId: string;
};
