import { ProfileEditInfo } from "models/profile/ProfileEditInfo";

export type GetEditableInfoSuccess = {
    type: string;
    payload: ProfileEditInfo;
};

export type GetEditableInfoFailure = {
    type: string;
    payload: string;
};
