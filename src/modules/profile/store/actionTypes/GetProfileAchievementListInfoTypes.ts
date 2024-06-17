import { ProfileAchievementListInfo } from "models/profile/ProfileAchievementListInfoState";

export type GetProfileAchievementListInfoRequest = {
    type: string;
    payload: string;
};

export type GetProfileAchievementListInfoSuccess = {
    type: string;
    payload: ProfileAchievementListInfo;
};

export type GetProfileAchievementListInfoFailure = {
    type: string;
    payload: string;
};
