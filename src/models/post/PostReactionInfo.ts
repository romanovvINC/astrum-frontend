import { PostAuthorInfo } from "models/post/PostAuthorInfo";

export type PostReactionInfo = {
    id: string;
    postId: string;
    user: PostAuthorInfo;
    dateCreated: Date;
};

export type PostReactionInfoResponse = Omit<PostReactionInfo, "created"> & {
    created: string;
};
