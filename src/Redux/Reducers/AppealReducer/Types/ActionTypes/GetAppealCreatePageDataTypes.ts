import { AppealCategory } from "../AppealCategory";
import { ErrorString } from "../../../../../models/AliasTypes";

export type GetAppealCreatePageData = {
    appealCategories: AppealCategory[];
    profileSummaries: ProfileSummaries[];
    coverUrl: string;
    coverImage: File | null;
};

export type ProfileSummaries = {
    userId: string;
    name: string;
    surname: string;
};

export type GetAppealCreatePageDataRequest = {
    type: string;
    payload: GetAppealCreatePageData;
};

export type GetAppealCreatePageDataSuccess = {
    type: string;
    payload: GetAppealCreatePageData;
};

export type GetAppealCreatePageDataFailure = {
    type: string;
    payload: ErrorString;
};
