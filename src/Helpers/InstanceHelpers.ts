import { ArticlePost } from "models/post/ArticlePost";
import { UserPost } from "models/post/UserPost";
import { Post } from "models/post/Post";

export const isArticle = (obj: Post): obj is ArticlePost => {
    return obj.isArticle;
};

export const isUserPost = (obj: Post): obj is UserPost => {
    return !obj.isArticle;
};
