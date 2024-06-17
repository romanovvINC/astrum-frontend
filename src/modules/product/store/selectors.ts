import { RootState } from "Redux/store";
import { ProductState } from "models/product/ProductState";
import { ProductInfo } from "models/product/ProductInfo";
import { ProjectInfo } from "models/product/ProjectInfo";
import { ProductListInfo } from "models/product/ProductListInfo";

export const productSelectors = {
    getProductState: (state: RootState): ProductState => state.ProductReducer,

    getProductListInfo: (state: RootState): ProductListInfo => state.ProductReducer.productListInfo,

    getProductInfo: (state: RootState): ProductInfo => state.ProductReducer.productInfo,

    getProjectInfo: (state: RootState): ProjectInfo => state.ProductReducer.projectInfo,
};
