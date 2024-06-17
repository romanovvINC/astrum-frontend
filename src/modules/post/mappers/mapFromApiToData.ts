import { PostCommentInfo, PostCommentInfoResponse } from "models/post/PostCommentInfo";
import { PostLikeInfo, PostLikeInfoResponse } from "models/post/PostLikeInfo";

export const mapFromPostCommentInfoResponseToData = (comment: PostCommentInfoResponse): PostCommentInfo => {
    const { created, ...rest } = comment;
    return {
        ...rest,
        dateCreated: new Date(created),
    };
};

export const mapFromPostLikeInfoResponseToData = (like: PostLikeInfoResponse): PostLikeInfo => {
    const { created, ...rest } = like;
    return {
        ...rest,
        dateCreated: new Date(created),
    };
};
