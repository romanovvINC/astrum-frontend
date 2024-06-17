import React, { FC, useCallback } from "react";
import { Col, Row } from "reactstrap";
import { useNavigate } from "react-router-dom";
import { useAppSelector } from "Redux/hooks";
import { ProductActions, productSelectors } from "modules/product";
import { ButtonBack } from "ui/Button";

import s from "./ProductInfoHeader.module.scss";

interface IProductInfoHeader {
    enableActions: boolean;
}

const ProductInfoHeader: FC<IProductInfoHeader> = ({ enableActions }) => {
    const {
        pending,
        productInfo: { name },
    } = useAppSelector(productSelectors.getProductState);
    const navigate = useNavigate();

    const goToProductList = useCallback(() => navigate("/products"), []);

    return (
        <Row>
            <Col className={s.header}>
                <ButtonBack
                    breadcrumbsPaths={["Продукты", name]}
                    onClick={goToProductList}
                />
                {enableActions && <ProductActions />}
            </Col>
        </Row>
    );
};

export default ProductInfoHeader;
