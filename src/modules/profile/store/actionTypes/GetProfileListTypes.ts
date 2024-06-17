import { ProfileShortInfo } from "models/profile/ProfileShortInfo";
import { MainFilterState } from "models/filter/FilterState";

export type GetProfileListRequest = {
    type: string;
    payload: MainFilterState;
};

export type GetProfileListSuccess = {
    type: string;
    payload: ProfileShortInfo[];
};

export type GetProfileListFailure = {
    type: string;
    payload: string;
};
