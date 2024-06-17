import { CustomField } from "models/CustomField";
import { SuccessCallback } from "models/AliasTypes";

export type CreateProfileCustomFieldRequestPayload = Omit<CustomField, "id"> & {
    userId: string;
};

export type CreateProfileCustomFieldRequest = {
    type: string;
    payload: {
        data: Omit<CustomField, "id">;
        successCallback: SuccessCallback;
    };
};

export type CreateProfileCustomFieldSuccess = {
    type: string;
    payload: CustomField;
};

export type CreateProfileCustomFieldFailure = {
    type: string;
    payload: string;
};
