import { AppealCategory } from "../AppealCategory";
import { Appeal, AppealStatus } from "../Appeal";
import { ErrorString } from "../../../../../models/AliasTypes";

export type EditAppealRequestPayload = {
    id: string;
    title: string;
    request: string;
    categories: AppealCategory[];
    from: string;
    to: string;
    appealStatus: AppealStatus;
    answer: string;
    dateCreated: Date;
    closed: Date;
};

export type EditAppealRequest = {
    type: string;
    payload: EditAppealRequestPayload;
};

export type EditAppealSuccess = {
    type: string;
    payload: Appeal;
};

export type EditAppealFailure = {
    type: string;
    payload: ErrorString;
};
