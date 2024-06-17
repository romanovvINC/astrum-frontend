import { ProjectInfo } from "models/product/ProjectInfo";

export type SetProject = {
    type: string;
    payload: ProjectInfo;
};

export type SetPageIndex = {
    type: string;
    payload: number;
};

export type SetCanAsyncPending = {
    type: string;
    payload: boolean;
};
