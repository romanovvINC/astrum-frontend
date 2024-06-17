import { ProjectInfo } from "models/product/ProjectInfo";

export type GetProjectRequest = {
    type: string;
    payload: string;
};

export type GetProjectSuccess = {
    type: string;
    payload: ProjectInfo;
};

export type GetProjectFailure = {
    type: string;
    payload: string;
};
