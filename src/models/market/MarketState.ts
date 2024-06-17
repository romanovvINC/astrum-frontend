import { MarketProduct } from "./MarketProduct";
import { MarketOrder } from "./MarketOrder";
import { MarketBasket } from "./MarketBasket";
import { QueryArg } from "./QueryArgTypes";

export type MarketState = {
    pending: boolean;
    products: MarketProduct[];
    orders: MarketOrder[];
    basket: MarketBasket;
    money: number;
    queryArg: QueryArg;
    error: string | null;
};
