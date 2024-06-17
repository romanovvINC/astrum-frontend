import { ErrorString } from "../../../../../models/AliasTypes";

export type DeleteAppealCategoryRequestPayload = {
    id: string;
};

export type DeleteAppealCategoryRequest = {
    type: string;
    payload: DeleteAppealCategoryRequestPayload;
};

export type DeleteAppealCategorySuccess = {
    type: string;
    payload: DeleteAppealCategoryRequestPayload;
};

export type DeleteAppealCategoryFailure = {
    type: string;
    payload: ErrorString;
};
