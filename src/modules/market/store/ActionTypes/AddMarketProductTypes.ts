import { MarketProduct, MarketProductRequest } from "models/market/MarketProduct";

export type AddMarketProductRequest = {
    type: string;
    payload: MarketProductRequest;
};

export type AddMarketProductSuccess = {
    type: string;
    payload: MarketProduct;
};

export type AddMarketProductFailure = {
    type: string;
    payload: string;
};
