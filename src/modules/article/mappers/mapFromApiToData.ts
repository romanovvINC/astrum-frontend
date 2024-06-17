import { ArticleInfoResponse } from "models/article/ArticleInfoResponse";
import { ArticleInfo } from "models/article/ArticleInfo";
import { ArticleShortInfoResponse } from "models/article/ArticleShortInfoResponse";
import { ArticleShortInfo } from "models/article/ArticleShortInfo";

export const mapArticleInfoResponseToData = (articleInfoResponse: ArticleInfoResponse): ArticleInfo => {
    return {
        ...articleInfoResponse,
        dateCreated: new Date(articleInfoResponse.dateCreated),
    };
};

export const mapArticleShortInfoToData = (articleShortInfoResponse: ArticleShortInfoResponse): ArticleShortInfo => {
    return {
        ...articleShortInfoResponse,
        dateCreated: new Date(articleShortInfoResponse.dateCreated),
    };
};

export const mapArticleListToData = (articleList: ArticleShortInfoResponse[]): ArticleShortInfo[] => {
    return articleList.map(a => mapArticleShortInfoToData(a));
};
