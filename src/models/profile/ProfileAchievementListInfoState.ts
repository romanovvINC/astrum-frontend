import { Achievement } from "./Achivement";

export type ProfileAchievementListInfo = {
    username: string;
    name: string;
    surname: string;
};

export type ProfileAchievementListInfoState = ProfileAchievementListInfo & {
    achievements: Achievement[];
};
