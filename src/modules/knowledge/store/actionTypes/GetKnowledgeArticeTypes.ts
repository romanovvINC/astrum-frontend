import { KnowledgeArticleInfo } from "models/knowledge/KnowledgeArticleInfo";

export type GetKnowledgeArticleRequest = {
    type: string;
    payload: string;
};

export type GetKnowledgeArticleSuccess = {
    type: string;
    payload: KnowledgeArticleInfo;
};

export type GetKnowledgeArticleFailure = {
    type: string;
    payload: string;
};
