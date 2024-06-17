import { ErrorString } from "../../../../../models/AliasTypes";

export type DeleteAppealRequestPayload = {
    id: string;
};

export type DeleteAppealRequest = {
    type: string;
    payload: DeleteAppealRequestPayload;
};

export type DeleteAppealSuccess = {
    type: string;
    payload: DeleteAppealRequestPayload;
};

export type DeleteAppealFailure = {
    type: string;
    payload: ErrorString;
};
