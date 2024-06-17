import { ShortProfileInfo } from "models/profile/ShortProfileInfo";

export type GetDebtUserListSuccess = {
    type: string;
    payload: ShortProfileInfo[];
};

export type GetDebtUserListFailure = {
    type: string;
    payload: string;
};
