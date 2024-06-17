import { SuccessCallback } from "models/AliasTypes";

export type DeletePostRequest = {
    type: string;
    payload: {
        id: string;
        successCallback: SuccessCallback;
    };
};

export type DeletePostFailure = {
    type: string;
    payload: string;
};
