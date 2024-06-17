import { ProductInfo } from "models/product/ProductInfo";

export type GetProductRequest = {
    type: string;
    payload: string;
};

export type GetProductSuccess = {
    type: string;
    payload: ProductInfo;
};

export type GetProductFailure = {
    type: string;
    payload: string;
};
