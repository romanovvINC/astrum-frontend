export type Question = {
    id: string;
    practiceId: string;
    termSourceId: string;
    question: string;
    answerOptions: AnswerOption[];
    rightAnswer?: string;
};

export type AnswerOption = {
    id: string;
    questionId: string;
    answer: string;
    correct?: boolean;
};
