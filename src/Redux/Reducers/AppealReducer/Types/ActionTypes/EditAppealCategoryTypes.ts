import { AppealCategory } from "../AppealCategory";
import { ErrorString } from "../../../../../models/AliasTypes";

export type EditAppealCategoryRequestPayload = {
    id: string;
    name: string;
};

export type EditAppealCategoryRequest = {
    type: string;
    payload: EditAppealCategoryRequestPayload;
};

export type EditAppealCategorySuccess = {
    type: string;
    payload: AppealCategory;
};

export type EditAppealCategoryFailure = {
    type: string;
    payload: ErrorString;
};
