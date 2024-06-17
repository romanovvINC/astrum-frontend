import { AppealCategory } from "../AppealCategory";
import { ErrorString } from "../../../../../models/AliasTypes";

export type AddAppealCategoryRequestPayload = {
    name: string;
};

export type AddAppealCategoryRequest = {
    type: string;
    payload: AddAppealCategoryRequestPayload;
};

export type AddAppealCategorySuccess = {
    type: string;
    payload: AppealCategory;
};

export type AddAppealCategoryFailure = {
    type: string;
    payload: ErrorString;
};
