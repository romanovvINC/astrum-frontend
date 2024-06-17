import { Term } from "models/learning/dictionary/Term";

export type SetFlashPositionType = {
    type: string;
    payload: number;
};

export type SetFlashCurrentCardType = {
    type: string;
    payload: Term;
};

export type SetFlashAnswerType = {
    type: string;
    payload: Term;
};

export type SetFlashIsFinishedType = {
    type: string;
    payload: boolean;
};

export type SetFlashIsStartedType = {
    type: string;
    payload: boolean;
};
