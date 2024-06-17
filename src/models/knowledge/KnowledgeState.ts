import { YoutrackProjectInfo } from "models/knowledge/YoutrackProjectInfo";
import { KnowledgeArticleInfo } from "models/knowledge/KnowledgeArticleInfo";

export type KnowledgeState = {
    pending: boolean;
    pendingProjectList: boolean;
    pendingArticleList: boolean;
    projectList: YoutrackProjectInfo[];
    projectInfo: YoutrackProjectInfo;
    articleList: KnowledgeArticleInfo[];
    articleInfo: KnowledgeArticleInfo;
    error: string | null;
    errorProjectList: string | null;
    errorArticleList: string | null;
};
