import { PostReactionInfo, PostReactionInfoResponse } from "./PostReactionInfo";

export type PostCommentInfo = PostReactionInfo & {
    replyCommentId: string | null;
    childComments: PostCommentInfo[];
    text: string;
};

export type PostCommentInfoResponse = PostReactionInfoResponse & {
    replyCommentId: string | null;
    childComments: PostCommentInfo[];
    text: string;
};

export type CreatePostCommentInfo = Omit<PostCommentInfo, "id" | "user" | "dateCreated" | "childComments"> & {
    from: string;
};

export type CreatePostCommentInfoRequestPayload = CreatePostCommentInfo & {
    dateCreated: string;
};

export type EditPostCommentInfo = CreatePostCommentInfo & {
    id: string;
    dateCreated: Date;
};

export type EditPostCommentInfoRequestPayload = Omit<EditPostCommentInfo, "dateCreated"> & {
    dateCreated: string;
};
