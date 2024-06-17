import { Category } from "./Category";
import { ArticleListInfo } from "./ArticleListInfo";
import { ArticleInfo } from "./ArticleInfo";

export type ArticleState = {
    pending: boolean;
    pendingAsync: boolean;
    pendingChange: boolean;
    pendingCheckArticleName: boolean;
    pendingCategories: boolean;
    pendingFilter: boolean;
    articleNameIsExist: boolean;
    categories: Category[];
    articleListInfo: ArticleListInfo;
    articleInfo: ArticleInfo;
    error: string | null;
    errorCheckArticleName: string | null;
    errorCategories: string | null;
    errorFilter: string | null;
};
