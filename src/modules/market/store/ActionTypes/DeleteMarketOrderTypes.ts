import { ErrorString } from "models/AliasTypes";

export type DeleteMarketOrderRequest = {
    type: string;
    payload: string;
};

export type DeleteMarketOrderSuccess = {
    type: string;
    payload: string;
};

export type DeleteMarketOrderFailure = {
    type: string;
    payload: ErrorString;
};
