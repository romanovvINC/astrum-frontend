import { MarketOrder } from "models/market/MarketOrder";
import { ErrorString } from "models/AliasTypes";
import { MarketOrderRequest } from "models/market/MarketOrderRequestTypes";

export type EditMarketOrderRequestPayload = {
    id: string;
    data: MarketOrderRequest;
};

export type EditMarketOrderRequest = {
    type: string;
    payload: EditMarketOrderRequestPayload;
};

export type EditMarketOrderSuccess = {
    type: string;
    payload: MarketOrder;
};

export type EditMarketOrderFailure = {
    type: string;
    payload: ErrorString;
};
