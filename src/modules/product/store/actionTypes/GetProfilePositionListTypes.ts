import { ProfilePositionInfo } from "models/profile/ProfilePositionInfo";

export type GetProfilePositionListSuccess = {
    type: string;
    payload: ProfilePositionInfo[];
};

export type GetProfilePositionListFailure = {
    type: string;
    payload: string;
};
