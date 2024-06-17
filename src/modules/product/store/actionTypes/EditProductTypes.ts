import { ProductEditInfo } from "models/product/ProductEditInfo";
import { SuccessCallback } from "models/AliasTypes";
import { ProductInfo } from "models/product/ProductInfo";

export type EditProductRequest = {
    type: string;
    payload: {
        data: ProductEditInfo;
        successCallback: SuccessCallback;
    };
};

export type EditProductSuccess = {
    type: string;
    payload: ProductInfo;
};

export type EditProductFailure = {
    type: string;
    payload: string;
};
