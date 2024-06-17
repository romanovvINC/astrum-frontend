import { PostReactionInfo, PostReactionInfoResponse } from "./PostReactionInfo";

export type PostLikeInfo = PostReactionInfo;

export type PostLikeInfoResponse = PostReactionInfoResponse;

export type CreatePostLikeInfo = Omit<PostLikeInfo, "id" | "user" | "dateCreated"> & {
    from: string;
};

export type CreatePostLikeInfoRequestPayload = CreatePostLikeInfo & {
    dateCreated: string;
};
