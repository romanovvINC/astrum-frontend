import { RootState } from "Redux/store";
import { ProfileInfoState } from "models/profile/ProfileInfoState";
import { ProfileState } from "models/profile/ProfileState";
import { ProfileEditInfo } from "models/profile/ProfileEditInfo";
import { ProfileListState } from "models/profile/ProfileListState";
import { ProfileAchievementListInfoState } from "models/profile/ProfileAchievementListInfoState";

export const profileSelectors = {
    getProfileState: (state: RootState): ProfileState => state.ProfileReducer,

    getProfileInfo: (state: RootState): ProfileInfoState => state.ProfileReducer.profileInfo,

    getProfileAchievementListInfo: (state: RootState): ProfileAchievementListInfoState =>
        state.ProfileReducer.profileAchievementListInfo,

    getProfileEditInfo: (state: RootState): ProfileEditInfo => state.ProfileReducer.profileEditInfo,

    getProfileListInfo: (state: RootState): ProfileListState => state.ProfileReducer.profileList,

    getProfileListFilter: (state: RootState) => ({
        pendingFilter: state.ProfileReducer.pendingFilter,
        filter: state.ProfileReducer.profileList.filter,
        filterVariants: state.ProfileReducer.profileList.filterVariants,
    }),

    getProfileAttendance: (state: RootState) => ({
        profileInfo: state.ProfileReducer.profileEditInfo,
        profileAttendance: "",
    }),
};
