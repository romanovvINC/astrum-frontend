import { OrderProduct } from "./OrderProduct";

export type MarketOrder = {
    id: string;
    userId: string;
    comment: string;
    sellerResponse: string;
    status: MarketOrderStatus;
    orderProducts: OrderProduct[];
    cursor: string;
};

export enum MarketOrderStatus {
    ORDERED = "ORDERED",
    CANCELLED = "CANCELLED",
    COMPLETED = "COMPLETED",
}

export const MarketOrderStatusName = {
    [MarketOrderStatus.ORDERED]: "Создан",
    [MarketOrderStatus.CANCELLED]: "Отменён",
    [MarketOrderStatus.COMPLETED]: "Завершён",
} as const;
