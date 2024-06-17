import { ProductInfoResponse } from "models/product/ProductInfo";

export type ProductListResponse = {
    products: ProductInfoResponse[];
    index: number;
    nextExist: boolean;
};
