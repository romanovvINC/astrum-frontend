import { ProjectEditInfo } from "models/product/ProjectEditInfo";
import { ProjectInfo } from "models/product/ProjectInfo";
import { SuccessCallback } from "models/AliasTypes";

export type EditProjectRequest = {
    type: string;
    payload: {
        data: ProjectEditInfo;
        successCallback: SuccessCallback;
    };
};

export type EditProjectSuccess = {
    type: string;
    payload: ProjectInfo;
};

export type EditProjectFailure = {
    type: string;
    payload: string;
};
