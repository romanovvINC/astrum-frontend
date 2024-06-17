import { FC, useEffect, useState } from "react";
import { useAppSelector } from "Redux/hooks";
import { useDispatch } from "react-redux";

import type { GetMarketProductRequestPayload } from "modules/market/store/ActionTypes/GetMarketProductTypes";

import { getMarketProducts, marketSelectors, addMarketProduct } from "modules/market";
import ProductGrid from "./ProductGrid";
import { getMarketProductsRequest } from "modules/market/store";
import { MarketProduct } from "models/market/MarketProduct";

const MarketProductListInfo: FC = () => {
    const {products, pending, error} = useAppSelector((state) => state.MarketReducer);
    const [pageSize, setPageSize] = useState(8);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getMarketProductsRequest({page: 1, pageSize: pageSize}))
    }, [pageSize])

    const addProduct = async () => {
        const data = await addMarketProduct( {
            name: 'wolf',
            summary: 'asdasdasd',
            description: 'asdasdasd',
            price: 400,
            remain: 2,
            isAvailable: true,
            isInfinite: false,
        })
        return data;
    }

    useEffect(() => {
        const onScroll = () => {
          const scrolledToBottom =
            Math.ceil(window.innerHeight + window.scrollY) >=
            document.body.offsetHeight;
    
          if (scrolledToBottom) {
            setPageSize((prev) => prev + 8);
            // setLocalData(JSON.stringify(data));
          }
        };
    
        document.addEventListener("scroll", onScroll);
    
        return function () {
          document.removeEventListener("scroll", onScroll);
        };
      }, [pageSize, pending]);

    return (
        <div className="product-grid">
            {/*Поля вида, поиска и фильтров */}
            {/*<ProductFeatures />*/}
            <ProductGrid marketProducts={products} />
            <span>{products.length}</span>
            <button onClick={addProduct}>Добавить пользователя</button>
        </div>
    );
};

export default MarketProductListInfo;
