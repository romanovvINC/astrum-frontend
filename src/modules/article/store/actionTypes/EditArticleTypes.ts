import { ArticleEditInfo } from "models/article/ArticleEditInfo";
import { SuccessCallback } from "models/AliasTypes";

export type EditArticleRequest = {
    type: string;
    payload: {
        data: ArticleEditInfo;
        successCallback: SuccessCallback;
    };
};

export type EditArticleFailure = {
    type: string;
    payload: string;
};
