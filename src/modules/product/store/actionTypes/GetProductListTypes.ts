import { MainFilterState } from "models/filter/FilterState";
import { ProductInfo } from "models/product/ProductInfo";

export type GetProductListRequest = {
    type: string;
    payload: MainFilterState;
};

export type GetProductListSuccess = {
    type: string;
    payload: ProductInfo[];
};

export type GetProductListFailure = {
    type: string;
    payload: string;
};
