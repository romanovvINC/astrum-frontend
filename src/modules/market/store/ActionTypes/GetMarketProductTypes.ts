import { MarketProduct } from "models/market/MarketProduct";

export type GetMarketProductRequestPayload = {
    page: number;
    pageSize: number;
};

export type GetMarketProductRequest = {
    type: string;
    payload: GetMarketProductRequestPayload;
};

export type GetMarketProductSuccess = {
    type: string;
    payload: MarketProduct;
};

export type GetMarketProductFailure = {
    type: string;
    payload: string;
};
