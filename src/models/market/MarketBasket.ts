import { BasketProduct } from "./BasketProduct";

export type MarketBasket = {
    id: string;
    owner: string;
    products: BasketProduct[];
};
