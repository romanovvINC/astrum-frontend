import { CustomField } from "models/CustomField";

export type DeleteProfileCustomFieldRequest = {
    type: string;
    payload: string;
};

export type DeleteProfileCustomFieldSuccess = {
    type: string;
    payload: CustomField[];
};

export type DeleteProfileCustomFieldFailure = {
    type: string;
    payload: string;
};
