import { PostReactionInfo, PostReactionInfoResponse } from "models/post/PostReactionInfo";
import { PostCommentInfo, PostCommentInfoResponse } from "models/post/PostCommentInfo";
import { Attachment } from "models/MainTypes";
import { PostAuthorInfo } from "models/post/PostAuthorInfo";

export type AbstractPost = {
    id: string;
    title: string | null;
    text: string | null;
    readingTime?: number | null;
    description?: string | null;
    isArticle: boolean;
    dateCreated: Date;
    user: PostAuthorInfo;
    attachments: Attachment[];
    comments: PostCommentInfo[];
    likes: PostReactionInfo[];
};

export type AbstractPostResponse = Omit<AbstractPost, "dateCreated" | "comments" | "likes"> & {
    dateCreated: string;
    comments: PostCommentInfoResponse[];
    likes: PostReactionInfoResponse[];
};
