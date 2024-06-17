import { BasicInfo } from "models/auth/BasicInfo";

export type CheckAuthSuccess = {
    type: string;
    payload: BasicInfo;
};

export type CheckAuthFailure = {
    type: string;
    payload: string;
};
