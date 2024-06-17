import { Term } from "models/learning/dictionary/Term";

export type GetTermsSuccess = {
    type: string;
    payload: Term[];
};

export type GetTermsFailure = {
    type: string;
    payload: string;
};

export type GetTermByIdSuccess = {
    type: string;
    payload: Term;
};

export type GetTermByIdFailure = {
    type: string;
    payload: string;
};
