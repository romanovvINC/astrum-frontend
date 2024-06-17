import { FeedPostRequest } from "Redux/Reducers/FeedReducer/Types/FeedPostRequest";
import { SuccessCallback } from "models/AliasTypes";

export type CreatePostRequest = {
    type: string;
    payload: {
        data: FeedPostRequest;
        successCallback: SuccessCallback;
    };
};

export type CreatePostFailure = {
    type: string;
    payload: string;
};
