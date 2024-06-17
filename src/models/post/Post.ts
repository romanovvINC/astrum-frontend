import { UserPost, UserPostResponse } from "./UserPost";
import { ArticlePost, ArticlePostResponse } from "./ArticlePost";

export type Post = UserPost | ArticlePost;

export type PostResponse = UserPostResponse | ArticlePostResponse;
