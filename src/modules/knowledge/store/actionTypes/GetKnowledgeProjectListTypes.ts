import { YoutrackProjectInfo } from "models/knowledge/YoutrackProjectInfo";

export type GetKnowledgeProjectListRequest = {
    type: string;
    payload: string;
};

export type GetKnowledgeProjectListSuccess = {
    type: string;
    payload: YoutrackProjectInfo[];
};

export type GetKnowledgeProjectListFailure = {
    type: string;
    payload: string;
};
