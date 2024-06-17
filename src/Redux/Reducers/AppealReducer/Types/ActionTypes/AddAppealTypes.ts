import { AppealCategory } from "../AppealCategory";
import { Appeal, AppealStatus } from "../Appeal";
import { ErrorString } from "../../../../../models/AliasTypes";

export type AddAppealRequestPayload = {
    title: string;
    request: string;
    categories: AppealCategory[];
    from: string;
    to: string;
    status: AppealStatus;
};

export type AddAppealRequest = {
    type: string;
    payload: AddAppealRequestPayload;
};

export type AddAppealSuccess = {
    type: string;
    payload: Appeal;
};

export type AddAppealFailure = {
    type: string;
    payload: ErrorString;
};
