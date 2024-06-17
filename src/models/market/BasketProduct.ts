import { MarketProduct } from "./MarketProduct";

export type BasketProduct = {
    amount: number;
    productId: string;
    product: MarketProduct;
};
