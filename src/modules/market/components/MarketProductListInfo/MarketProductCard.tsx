import React, { FC, useCallback } from "react";
import { Card } from "reactstrap";
import { ReactComponent as MoneyIcon } from "assets/svg/money-icon.svg";
import { MarketProduct } from "models/market/MarketProduct";

import s from "./MarketProductListInfo.module.scss";

interface IMarketProductCardProps {
    item: MarketProduct;
    imageSrc: string;
    onClickAddToBasket: (productId: string) => void;
    onClickProduct: () => void;
}

const MarketProductCard: FC<IMarketProductCardProps> = ({ item, imageSrc, onClickAddToBasket, onClickProduct }) => {
    const clickAddToBasketHandler = useCallback(
        (e: React.MouseEvent) => {
            e.stopPropagation();
            onClickAddToBasket(item.id);
        },
        [onClickAddToBasket, item]
    );

    return (
        <Card className={s.cardItem}>
            <div className="product-box">
                <div className="product-img">
                    <img
                        className={`img-fluid ${s.image}`}
                        src={imageSrc}
                        alt={""}
                    />
                    <div
                        className="product-hover"
                        onClick={onClickProduct}
                    >
                        <ul className={"simple-list"}>
                            <li onClick={clickAddToBasketHandler}>
                                <i className="icon-shopping-cart"></i>
                            </li>
                            <li onClick={onClickProduct}>
                                <i className="icon-eye"></i>
                            </li>
                        </ul>
                    </div>
                </div>
                <div className={`product-details ${s.details}`}>
                    <div>
                        <h4 className={s.description}>{item.name}</h4>
                        <p>{item.summary}</p>
                    </div>
                    <div
                        className="product-price d-flex"
                        style={{ alignItems: "center", gap: "5px", marginTop: "auto" }}
                    >
                        <MoneyIcon />
                        {item.price}
                    </div>
                </div>
            </div>
        </Card>
    );
};

export default MarketProductCard;
