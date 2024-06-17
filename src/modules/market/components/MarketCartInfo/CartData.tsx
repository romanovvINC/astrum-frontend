import React, { ChangeEvent, FC, useEffect, useState } from "react";
import { Input, Table } from "reactstrap";
import { XCircle } from "react-feather";
import { useAppDispatch, useAppSelector } from "Redux/hooks";
import { MarketBasket } from "models/market/MarketBasket";
import { authSelectors, setMoney } from "modules/auth";
import {
    marketSelectors,
    addBasketProductRequest,
    addBasketProductSuccess,
    addMarketOrderRequest,
    deleteBasketProductRequest,
} from "modules/market";
import { CartTableHeader } from "Constant";
import BuyModal from "./BuyModal";
import CartEmpty from "./CartEmpty";
import { ButtonMain } from "ui/Button";
import { Image } from "ui/Image";
import { notification } from "Utils/Notification";
import { BasketProduct } from "models/market/BasketProduct";
import classNames from "classnames";
import s from "./Cart.module.scss";

interface ICartDataProps {
    data: { basket: MarketBasket };
}

const CartData: FC<ICartDataProps> = ({ data }) => {
    const { money, userId } = useAppSelector(authSelectors.getBasicInfo);
    const { pending, basket } = useAppSelector(marketSelectors.getMarketState);

    useEffect(() => {
        if (data) {
            dispatch(addBasketProductSuccess(data.basket));
            // setBasket(cartData.basket);
        }
    }, [data]);

    const dispatch = useAppDispatch();
    const removefromcart = (item: any) => {
        dispatch(
            deleteBasketProductRequest({
                productId: item.productId,
                basketId: data.basket.id,
                amount: item.amount,
            })
        );
        // history(`${process.env.PUBLIC_URL}/market/cart`);
    };

    const [openModal, setOpenModal] = useState(false);
    const [comment, setComment] = useState("");
    const buyModal = () => {
        setOpenModal(!openModal);
    };

    const createOrder = () => {
        setOpenModal(!openModal);
        const price = basket.products
            .map(item => {
                return item.amount * item.product.price;
            })
            .reduce((a, b) => a + b, 0);
        const resultMoney = money - price;
        if (resultMoney < 0) {
            notification(null, "Не хватает средств", "danger");
        } else {
            dispatch(
                addMarketOrderRequest({
                    //eslint-disable-next-line
                    //@ts-ignore
                    comment: comment,
                    orderProducts: basket.products.map(item => {
                        return {
                            amount: item.amount,
                            productId: item.productId,
                        };
                    }),
                    userId: userId,
                })
            );
            dispatch(setMoney(money - price));
        }
    };

    const changeQty = (item: BasketProduct, e: ChangeEvent<HTMLInputElement>) => {
        console.log(e.target.value);
        const newCount = parseInt(e.target.value);
        const delta = newCount - item.amount;
        changeProductAmount(item.productId, delta);
    };

    const changeProductAmount = (productId: string, amount: number) => {
        if (amount > 0) {
            dispatch(
                addBasketProductRequest({
                    amount,
                    productId: productId,
                    basketId: data.basket.id,
                })
            );
        } else if (amount < 0) {
            dispatch(
                deleteBasketProductRequest({
                    amount: -amount,
                    productId: productId,
                    basketId: data.basket.id,
                })
            );
        }
    };

    const getCartTotal = (cartItems: any[]) => {
        let total = 0;
        let items = 0;
        for (let i = 0; i < cartItems.length; i++) {
            items = cartItems[i].amount * cartItems[i].product.price;
            total = total + items;
        }
        return total;
    };

    if (pending && basket.products.length === 0) {
        return <div>Загрузка....</div>;
    } else {
        return (
            <>
                {basket.products && basket.products.length > 0 ? (
                    <div className="order-history table-responsive wishlist">
                        <Table className="table-bordered">
                            <thead>
                                <tr>
                                    {CartTableHeader.map((items, i) => (
                                        <th key={i}>{items}</th>
                                    ))}
                                </tr>
                            </thead>
                            <tbody style={{ borderTop: "none" }}>
                                {basket.products.map(item => {
                                    let imagesrc = "";
                                    if (item.product.coverUrl === undefined || item.product.coverUrl === null)
                                        imagesrc =
                                            "https://www.casavanity.com/modules/tea_lookbook/views/img/images/7dd432c8b0a1a7851d81077428351c08a437bd8b_watch.jpg";
                                    else imagesrc = item.product.coverUrl;
                                    return (
                                        //eslint-disable-next-line
                                        //@ts-ignore
                                        <tr key={item.id}>
                                            <td>
                                                <Image
                                                    className={"img-fluid img-80"}
                                                    src={imagesrc}
                                                    alt={"#"}
                                                />
                                            </td>
                                            <td>
                                                <div className="product-name">
                                                    <a>
                                                        <h6>{item.product.name}</h6>
                                                    </a>
                                                </div>
                                            </td>
                                            <td>{item.product.price}</td>
                                            <td>
                                                <div
                                                    style={{ maxWidth: "120px" }}
                                                    className="input-group product-quantity"
                                                >
                                                    <span className="input-group-prepend">
                                                        <ButtonMain
                                                            className={"btn btn-primary bootstrap-touchspin-down"}
                                                            onClick={() => changeProductAmount(item.productId, -1)}
                                                        >
                                                            <i className="fa fa-minus"></i>
                                                        </ButtonMain>
                                                    </span>
                                                    <Input
                                                        type="number"
                                                        name="quantity"
                                                        value={item.amount}
                                                        style={{ textAlign: "center" }}
                                                        className={classNames(
                                                            "form-control input-number",
                                                            s.input_count
                                                        )}
                                                        onChange={e => changeQty(item, e)}
                                                    />
                                                    <span className="input-group-append">
                                                        <ButtonMain
                                                            className={"btn btn-primary bootstrap-touchspin-up"}
                                                            onClick={() => changeProductAmount(item.productId, 1)}
                                                        >
                                                            <i className="fa fa-plus"></i>
                                                        </ButtonMain>
                                                    </span>
                                                </div>
                                            </td>
                                            <td>
                                                <a onClick={() => removefromcart(item)}>
                                                    <XCircle />
                                                </a>
                                            </td>
                                            <td>{item.product.price * item.amount}</td>
                                        </tr>
                                    );
                                })}
                                <tr>
                                    <td className="total-amount">
                                        <h6 className={"m-0 text-end"}>
                                            <span className="f-w-600">Итоговая цена :</span>
                                        </h6>
                                    </td>
                                    <td>
                                        <span>{getCartTotal(basket.products)}</span>
                                    </td>
                                    <td colSpan={3}></td>
                                    <td>
                                        <ButtonMain
                                            className={"ms-4"}
                                            type={"button"}
                                            onClick={buyModal}
                                        >
                                            Купить
                                        </ButtonMain>
                                        <BuyModal
                                            isOpen={openModal}
                                            title="Подтверждение покупки"
                                            toggler={buyModal}
                                            data={basket}
                                            comment={comment}
                                            total={getCartTotal(basket.products)}
                                            onChangeComment={setComment}
                                            onSend={createOrder}
                                        />
                                    </td>
                                </tr>
                            </tbody>
                        </Table>
                    </div>
                ) : (
                    <CartEmpty />
                )}
            </>
        );
    }
};
export default CartData;
