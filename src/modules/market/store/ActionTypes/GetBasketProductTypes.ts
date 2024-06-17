import { MarketBasket } from "models/market/MarketBasket";

export type GetBasketProductRequest = {
    type: string;
    payload: string;
};

export type GetBasketProductSuccess = {
    type: string;
    payload: MarketBasket;
};

export type GetBasketProductFailure = {
    type: string;
    payload: string;
};
