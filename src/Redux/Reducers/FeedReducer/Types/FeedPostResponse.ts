import { ArticlePostResponse } from "models/post/ArticlePost";
import { UserPostResponse } from "models/post/UserPost";

export type FeedPostResponse = UserPostResponse | ArticlePostResponse;
