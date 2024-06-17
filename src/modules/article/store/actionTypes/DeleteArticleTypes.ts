import { SuccessCallback } from "models/AliasTypes";

export type DeleteArticleRequest = {
    type: string;
    payload: {
        id: string;
        successCallback: SuccessCallback;
    };
};

export type DeleteArticleFailure = {
    type: string;
    payload: string;
};
