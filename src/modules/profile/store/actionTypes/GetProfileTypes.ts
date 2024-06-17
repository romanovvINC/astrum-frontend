import { ProfileInfo } from "models/profile/ProfileInfo";

export type GetProfileRequest = {
    type: string;
    payload: string;
};

export type GetProfileSuccess = {
    type: string;
    payload: ProfileInfo;
};

export type GetProfileFailure = {
    type: string;
    payload: string;
};
