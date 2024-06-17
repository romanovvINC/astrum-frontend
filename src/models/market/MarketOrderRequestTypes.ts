import { MarketOrderStatus } from "./MarketOrder";

export type MarketOrderRequest = {
    id: string;
    userId: string;
    comment: string;
    sellerResponse: string;
    status: MarketOrderStatus;
    orderProducts: OrderProductRequest[];
};

export type OrderProductRequest = {
    amount: number;
    status: MarketOrderStatus;
    productId: string;
};
