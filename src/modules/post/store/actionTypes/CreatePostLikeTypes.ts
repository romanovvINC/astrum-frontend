import { CreatePostLikeInfo, PostLikeInfo } from "models/post/PostLikeInfo";
import { SuccessCallback } from "models/AliasTypes";

export type CreatePostLikeRequest = {
    type: string;
    payload: {
        data: CreatePostLikeInfo;
        successCallback: SuccessCallback;
    };
};

export type CreatePostLikeFailure = {
    type: string;
    payload: string;
};
