import React, { FC, useCallback } from "react";
import { Col, Container, Row } from "reactstrap";
import { useNavigate } from "react-router-dom";
import { ProductList, ProductListFilter } from "modules/product";
import { ButtonMain } from "ui/Button";

const ProductListPage: FC = () => {
    const navigate = useNavigate();

    const goToCreateHandler = useCallback(() => navigate("create"), []);

    return (
        <>
            <Container fluid={false}>
                <Col
                    className={"page-title"}
                    style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                    }}
                >
                    <h1>Продукты</h1>
                    <ButtonMain
                        variant={"secondary"}
                        onClick={goToCreateHandler}
                    >
                        Создать продукт
                    </ButtonMain>
                </Col>
                <Row>
                    <Col
                        xl="9"
                        className="xl-70"
                    >
                        <ProductList />
                    </Col>
                    <Col
                        xl="3"
                        className="xl-30"
                    >
                        <ProductListFilter />
                    </Col>
                </Row>
            </Container>
        </>
    );
};

export default ProductListPage;
