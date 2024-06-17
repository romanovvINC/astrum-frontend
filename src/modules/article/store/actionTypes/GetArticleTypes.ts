import { ArticleInfo } from "models/article/ArticleInfo";

export type GetArticleRequest = {
    type: string;
    payload: string;
};

export type GetArticleSuccess = {
    type: string;
    payload: ArticleInfo;
};

export type GetArticleFailure = {
    type: string;
    payload: string;
};
