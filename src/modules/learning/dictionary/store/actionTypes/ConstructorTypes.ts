import { Term } from "models/learning/dictionary/Term";

export type GetConstructorSuccess = {
    type: string;
    payload: Term[];
};

export type GetConstructorFailure = {
    type: string;
    payload: string;
};

export type PostConstructorRequest = {
    type: string;
    payload: PostConstructorRequestType;
};

export type PostConstructorFailure = {
    type: string;
    payload: string;
};

export type GetConstructorSelectedRequest = {
    type: string;
    payload: string;
};

export type PostConstructorRequestType = {
    userId: string;
    termIds: string[];
};
