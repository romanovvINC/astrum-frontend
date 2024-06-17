import { MarketProduct, MarketProductRequest } from "models/market/MarketProduct";
import { ErrorString } from "models/AliasTypes";

export type EditMarketProductRequestPayload = {
    id: string;
    data: MarketProductRequest;
};

export type EditMarketProductRequest = {
    type: string;
    payload: EditMarketProductRequestPayload;
};

export type EditMarketProductSuccess = {
    type: string;
    payload: MarketProduct;
};

export type EditMarketProductFailure = {
    type: string;
    payload: ErrorString;
};
