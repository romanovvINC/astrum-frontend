import { RootState } from "Redux/store";
import { ArticleListInfo } from "models/article/ArticleListInfo";
import { ArticleInfo } from "models/article/ArticleInfo";
import { ArticleState } from "models/article/ArticleState";

export const articleSelectors = {
    getArticleState: (state: RootState): ArticleState => state.ArticleReducer,

    getArticleInfo: (state: RootState): ArticleInfo => state.ArticleReducer.articleInfo,

    getArticleListInfo: (state: RootState): ArticleListInfo => state.ArticleReducer.articleListInfo,

    getFilter: (state: RootState) => ({
        pendingFilter: state.ArticleReducer.pendingFilter,
        filter: state.ArticleReducer.articleListInfo.filter,
        filterVariants: state.ArticleReducer.articleListInfo.filterVariants,
    }),
};
