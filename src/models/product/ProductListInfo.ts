import { ProductInfo } from "./ProductInfo";
import { MainFilterState } from "models/filter/FilterState";

export type ProductListInfo = {
    filter: MainFilterState;
    products: ProductInfo[];
};
