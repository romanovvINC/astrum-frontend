import { ErrorString } from "models/AliasTypes";
import { MarketBasket } from "models/market/MarketBasket";

export type EditBasketRequestPayload = {
    basketId: string;
    productId: string;
    amount: number | null;
};

export type EditBasketRequest = {
    type: string;
    payload: EditBasketRequestPayload;
};

export type EditBasketSuccess = {
    type: string;
    payload: MarketBasket;
};

export type EditBasketFailure = {
    type: string;
    payload: ErrorString;
};
