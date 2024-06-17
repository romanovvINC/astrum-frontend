import { DebtInfo } from "models/debt/DebtInfo";
import { ShortProfileInfo } from "models/profile/ShortProfileInfo";

export type DebtState = {
    pending: boolean;
    pendingUsers: boolean;
    pendingChange: boolean;
    debts: DebtInfo[];
    users: ShortProfileInfo[];
    error: string | null;
    errorUsers: string | null;
    errorChange: string | null;
};
