import { FC, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { useAppSelector } from "Redux/hooks";
import { BasketProduct } from "models/market/BasketProduct";
import { marketSelectors } from "modules/market";
import { MarketIconSvg } from "ui/icons/svgIcons";
import { Badge } from "ui/Badge";

import s from "./Header.module.scss";

const getCountProducts = (products: BasketProduct[]): number => {
    let result = 0;
    products.forEach(p => (result += p.amount));
    return result;
};

const MarketCartShortInfo: FC = () => {
    const { products } = useAppSelector(marketSelectors.getMarketBasket);
    const count = getCountProducts(products);
    const navigate = useNavigate();

    const navigateToCart = useCallback(() => navigate("market/cart"), []);

    return (
        <div className={s.market_short_info__container}>
            <MarketIconSvg
                className={s.cart_icon}
                width={30}
                height={30}
                onClick={navigateToCart}
            />
            <Badge
                className={s.products_count}
                text={count}
            />
        </div>
    );
};

export default MarketCartShortInfo;
