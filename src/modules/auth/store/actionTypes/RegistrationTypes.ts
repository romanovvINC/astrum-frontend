import { TRegistrationForm } from "models/auth/RegistrationForm";
import { SuccessCallback } from "models/AliasTypes";

export type RegistrationRequest = {
    type: string;
    payload: { data: TRegistrationForm; successCallback: SuccessCallback };
};

export type RegistrationSuccess = {
    type: string;
};

export type RegistrationFailure = {
    type: string;
    payload: string;
};
