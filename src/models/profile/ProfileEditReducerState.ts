import { ProfileEditInfoState } from "./ProfileEditInfoState";

export type ProfileEditReducerState = {
    pending: boolean;
    savePending: boolean;
    state: ProfileEditInfoState;
    error: string | null;
    saveError: string | null;
};
