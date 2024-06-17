import { TLoginForm } from "models/auth/LoginForm";
import { BasicInfo } from "models/auth/BasicInfo";

export type LoginRequest = {
    type: string;
    payload: TLoginForm;
};

export type LoginSuccess = {
    type: string;
    payload: BasicInfo;
};

export type LoginFailure = {
    type: string;
    payload: string;
};
