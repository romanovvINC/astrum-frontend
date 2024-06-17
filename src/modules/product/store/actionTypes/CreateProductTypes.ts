import { ProductCreateInfo } from "models/product/ProductCreateInfo";
import { SuccessCallback } from "models/AliasTypes";

export type CreateProductRequest = {
    type: string;
    payload: {
        data: ProductCreateInfo;
        successCallback: SuccessCallback;
    };
};

export type CreateProductFailure = {
    type: string;
    payload: string;
};
