import { CreatePostCommentInfo, PostCommentInfo } from "models/post/PostCommentInfo";
import { SuccessCallback } from "models/AliasTypes";

export type CreatePostCommentRequest = {
    type: string;
    payload: {
        data: CreatePostCommentInfo;
        successCallback: SuccessCallback;
    };
};

export type CreatePostCommentFailure = {
    type: string;
    payload: string;
};
