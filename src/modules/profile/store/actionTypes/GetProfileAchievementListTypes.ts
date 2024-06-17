import { Achievement } from "models/profile/Achivement";

export type GetProfileAchievementListRequest = {
    type: string;
    payload: string;
};

export type GetProfileAchievementListSuccess = {
    type: string;
    payload: Achievement[];
};

export type GetProfileAchievementListFailure = {
    type: string;
    payload: string;
};
