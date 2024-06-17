import { CustomField } from "models/CustomField";
import { SuccessCallback } from "models/AliasTypes";

export type EditProfileCustomFieldRequest = {
    type: string;
    payload: {
        data: CustomField;
        successCallback: SuccessCallback;
    };
};

export type EditProfileCustomFieldSuccess = {
    type: string;
    payload: CustomField[];
};

export type EditProfileCustomFieldFailure = {
    type: string;
    payload: string;
};
