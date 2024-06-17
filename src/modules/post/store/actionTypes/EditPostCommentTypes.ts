import { EditPostCommentInfo } from "models/post/PostCommentInfo";
import { SuccessCallback } from "models/AliasTypes";

export type EditPostCommentRequest = {
    type: string;
    payload: {
        id: string;
        postId: string;
        data: EditPostCommentInfo;
        successCallback: SuccessCallback;
    };
};

export type EditPostCommentFailure = {
    type: string;
    payload: string;
};
