import { MainFilterState } from "models/filter/FilterState";
import { ArticleShortInfo } from "models/article/ArticleShortInfo";

export type GetArticleListRequest = {
    type: string;
    payload: MainFilterState;
};

export type GetArticleListSuccess = {
    type: string;
    payload: ArticleShortInfo[];
};

export type GetArticleListFailure = {
    type: string;
    payload: string;
};
