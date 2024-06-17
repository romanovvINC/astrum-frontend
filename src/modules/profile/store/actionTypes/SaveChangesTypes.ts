import { ProfileEditInformation } from "models/profile/ProfileTypes";
import { ProfileEditInfo } from "models/profile/ProfileEditInfo";

export type SaveChangesRequest = {
    type: string;
    payload: ProfileEditInformation;
};

export type SaveChangesSuccess = {
    type: string;
    payload: ProfileEditInfo;
};

export type SaveChangeFailure = {
    type: string;
    payload: string;
};
