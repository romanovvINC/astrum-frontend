import { SuccessCallback } from "models/AliasTypes";

export type DeleteProjectRequest = {
    type: string;
    payload: {
        id: string;
        successCallback: SuccessCallback;
    };
};

export type DeleteProjectFailure = {
    type: string;
    payload: string;
};
