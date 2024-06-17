import React, { ChangeEvent, FC, useEffect, useState } from "react";
import { CloseButton, Col, Input, InputGroup, InputGroupText, Modal, ModalHeader, Row } from "reactstrap";
import { useAppDispatch } from "Redux/hooks";
import { ReactComponent as MoneyIcon } from "assets/svg/money-icon.svg";
import { addBasketProductRequest } from "modules/market";
import { Quantity } from "Constant";
import { ButtonMain } from "ui/Button";
import { Image } from "ui/Image";

import s from "./MarketProductListInfo.module.scss";
import classNames from "classnames";

interface IProductModalProps {
    value: boolean;
    setOpenModal: (newVal: boolean) => void;
    dataid: string;
    products: any[];
    basketId: string;
}

const ProductModal: FC<IProductModalProps> = props => {
    const { value = false, dataid = "", setOpenModal } = props;
    const [open, setOpen] = useState(value);
    const [stock, setStock] = useState("");
    const [quantity, setQuantity] = useState(1);
    const [singleProduct, setSingleProduct] = useState<any>(null);
    useEffect(() => {
        props.products.forEach((product, i) => {
            if (product.id === dataid) {
                setSingleProduct(product);
            }
        }); // eslint-disable-next-line
    }, []);
    const changeQty = (e: ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value.replace("-", "");
        setQuantity(parseInt(value));
    };
    const plusQty = () => {
        if (quantity >= 1) {
            setQuantity(quantity + 1);
        } else {
            setStock("Out of Stock !");
        }
    };
    const minusQty = () => {
        if (quantity > 1) {
            setStock("InStock");
            setQuantity(quantity - 1);
        }
    };
    const onCloseModal = () => {
        setOpen(false);
        setOpenModal(false);
    };

    const basketId = props.basketId;
    const dispatch = useAppDispatch();

    const AddToCarts = (item: any, quantity: any) => {
        dispatch(
            addBasketProductRequest({
                amount: quantity,
                productId: item.id,
                basketId,
            })
        );
    };
    let imagesrc = "";
    if (singleProduct?.coverUrl === undefined || singleProduct?.coverUrl === null)
        imagesrc =
            "https://www.casavanity.com/modules/tea_lookbook/views/img/images/7dd432c8b0a1a7851d81077428351c08a437bd8b_watch.jpg";
    else imagesrc = singleProduct.coverUrl;

    return (
        <Modal
            className={`modal-dialog modal-lg modal-dialog-centered ${s.modal}`}
            toggle={onCloseModal}
            isOpen={open}
        >
            <ModalHeader>
                <Row className="product-box">
                    <div className="product-img col-lg-6">
                        <Image
                            className={`img-fluid ${s.image}`}
                            src={imagesrc}
                            alt={""}
                        />
                    </div>
                    <Col
                        lg="6"
                        className="product-details text-start"
                    >
                        <a href="src/MyPages/MarketPage#javascript">
                            <h4>{singleProduct?.category}</h4>
                        </a>
                        <div
                            className="product-price d-flex"
                            style={{ alignItems: "center", gap: "5px" }}
                        >
                            <MoneyIcon />
                            {singleProduct?.price}
                        </div>
                        <div className="product-view">
                            <h6 className={"f-w-600"}>{singleProduct?.name}</h6>
                            <p className={"mb-0"}>{singleProduct?.description}</p>
                        </div>
                        <div className="product-qnty">
                            <h6 className={"f-w-600"}>{Quantity}</h6>
                            <InputGroup style={{ width: "35%" }}>
                                <ButtonMain
                                    className={"btn btn-primary bootstrap-touchspin-down"}
                                    onClick={minusQty}
                                >
                                    <i className="fa fa-minus"></i>
                                </ButtonMain>
                                <InputGroupText
                                    className="bootstrap-touchspin-prefix"
                                    style={{ display: "none" }}
                                />
                                <Input
                                    style={{ fontFamily: "Rubik" }}
                                    className={classNames("touchspin text-center", s.input_count)}
                                    type="number"
                                    name="quantity"
                                    value={quantity}
                                    onChange={changeQty}
                                />
                                <ButtonMain
                                    className={"btn btn-primary bootstrap-touchspin-up"}
                                    onClick={plusQty}
                                >
                                    <i className="fa fa-plus"></i>
                                </ButtonMain>
                            </InputGroup>
                            <div className="addcart-btn">
                                <ButtonMain
                                    onClick={() => {
                                        AddToCarts(singleProduct, quantity);
                                        onCloseModal();
                                    }}
                                >
                                    Добавить в корзину
                                </ButtonMain>
                            </div>
                        </div>
                    </Col>
                </Row>
                <CloseButton
                    color={"transprant"}
                    className={"btn-close"}
                    onClick={onCloseModal}
                    type={"button"}
                />
            </ModalHeader>
        </Modal>
    );
};

export default ProductModal;
