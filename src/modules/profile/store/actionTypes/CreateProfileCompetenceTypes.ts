import { SuccessCallback } from "models/AliasTypes";

export type CreateProfileCompetenceRequest = {
    type: string;
    payload: {
        data: string;
        successCallback: SuccessCallback;
    };
};

export type CreateProfileCompetenceSuccess = {
    type: string;
    payload: string[];
};

export type CreateProfileCompetenceFailure = {
    type: string;
    payload: string;
};
