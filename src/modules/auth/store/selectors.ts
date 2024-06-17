import { RootState } from "Redux/store";

export const authSelectors = {
    getAuthInfo: (state: RootState) => state.AuthReducer,

    getBasicInfo: (state: RootState) => state.AuthReducer.basicInfo,
};
