import { ArticleCreateInfo } from "models/article/ArticleCreateInfo";
import { SuccessCallback } from "models/AliasTypes";

export type CreateArticleRequest = {
    type: string;
    payload: {
        data: ArticleCreateInfo;
        successCallback: SuccessCallback;
    };
};

export type CreateArticleFailure = {
    type: string;
    payload: string;
};
