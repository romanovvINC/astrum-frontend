import { ShortProfileInfo } from "models/profile/ShortProfileInfo";

export type DebtUserInfo = ShortProfileInfo & {
    requisiteBank: string;
    requisiteNumberPhone: string;
};
