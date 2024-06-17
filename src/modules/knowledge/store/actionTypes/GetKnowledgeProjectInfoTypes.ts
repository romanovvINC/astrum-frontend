import { YoutrackProjectInfo } from "models/knowledge/YoutrackProjectInfo";

export type GetKnowledgeProjectInfoRequest = {
    type: string;
    payload: string;
};

export type GetKnowledgeProjectInfoSuccess = {
    type: string;
    payload: YoutrackProjectInfo;
};

export type GetKnowledgeProjectInfoFailure = {
    type: string;
    payload: string;
};
