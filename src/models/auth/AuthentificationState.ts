import { BasicInfo } from "models/auth/BasicInfo";

export type AuthenticationState = {
    isAuth: boolean;
    loginPending: boolean;
    logoutPending: boolean;
    registrationPending: boolean;
    checkAuthPending: boolean;
    passwordRecoveryPending: boolean;
    error: string | null;
    basicInfo: BasicInfo;
    basketId: string;
    redirectUrl: string;
};
