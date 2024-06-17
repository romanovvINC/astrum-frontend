import { MarketOrder } from "models/market/MarketOrder";
import { ErrorString } from "models/AliasTypes";
import { MarketOrderRequest } from "models/market/MarketOrderRequestTypes";

export type AddMarketOrderRequestPayload = {
    data: MarketOrderRequest;
};

export type AddMarketOrderRequest = {
    type: string;
    payload: AddMarketOrderRequestPayload;
};

export type AddMarketOrderSuccess = {
    type: string;
    payload: MarketOrder;
};

export type AddMarketOrderFailure = {
    type: string;
    payload: ErrorString;
};
