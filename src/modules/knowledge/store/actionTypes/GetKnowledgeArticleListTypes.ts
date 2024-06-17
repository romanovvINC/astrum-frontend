import { KnowledgeArticleInfo } from "models/knowledge/KnowledgeArticleInfo";

export type GetKnowledgeArticleListRequest = {
    type: string;
    payload: string;
};

export type GetKnowledgeArticleListSuccess = {
    type: string;
    payload: KnowledgeArticleInfo[];
};

export type GetKnowledgeArticleListFailure = {
    type: string;
    payload: string;
};
