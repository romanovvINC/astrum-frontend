import { MarketProduct } from "./MarketProduct";
import { MarketOrderStatus } from "./MarketOrder";

export type OrderProduct = {
    amount: number;
    status: MarketOrderStatus;
    productId: string;
    product: MarketProduct;
};
