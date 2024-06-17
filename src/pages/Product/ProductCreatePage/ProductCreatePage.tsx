import React, { FC, useCallback } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { Col, Container } from "reactstrap";
import { ProductCreateForm } from "modules/product";
import { ButtonBack } from "ui/Button";

const ProductCreatePage: FC = () => {
    const { id } = useParams();
    const { pathname } = useLocation();
    const navigate = useNavigate();
    const isEdit = Boolean(id) && pathname.includes("edit");
    const word = isEdit ? "Редактирование" : "Создание";

    const navigateToProductListHandler = useCallback(() => navigate("/products"), []);

    return (
        <Container fluid={false}>
            <Col>
                <ButtonBack
                    breadcrumbsPaths={["Продукты", `${word} продукта`]}
                    onClick={navigateToProductListHandler}
                />
            </Col>
            <ProductCreateForm
                id={id}
                isEdit={isEdit}
            />
        </Container>
    );
};

export default ProductCreatePage;
