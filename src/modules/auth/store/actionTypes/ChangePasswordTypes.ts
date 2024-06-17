import { ProfilePasswordRecovery } from "models/profile/ProfileTypes";

export type ChangePasswordRequest = {
    type: string;
    payload: ProfilePasswordRecovery;
};

export type ChangePasswordFailure = {
    type: string;
    payload: string;
};
