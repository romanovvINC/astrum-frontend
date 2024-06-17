import { RootState } from "Redux/store";
import { MarketState } from "models/market/MarketState";
import { QueryArg } from "models/market/QueryArgTypes";
import { MarketBasket } from "models/market/MarketBasket";

export const marketSelectors = {
    getMarketState: (state: RootState): MarketState => state.MarketReducer,
    getMarketQueryArg: (state: RootState): QueryArg => state.MarketReducer.queryArg,
    getMarketBasket: (state: RootState): MarketBasket => state.MarketReducer.basket,
} as const;
