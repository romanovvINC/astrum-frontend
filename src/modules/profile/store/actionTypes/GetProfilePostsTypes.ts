import { UserPost } from "models/post/UserPost";
import { ArticlePost } from "models/post/ArticlePost";

export type GetProfilePostsRequest = {
    type: string;
    payload: string;
};

export type GetProfilePostsAsyncRequest = GetProfilePostsRequest;

export type GetProfilePostsSuccess = {
    type: string;
    payload: (UserPost | ArticlePost)[];
};

export type GetProfilePostsFailure = {
    type: string;
    payload: string;
};
