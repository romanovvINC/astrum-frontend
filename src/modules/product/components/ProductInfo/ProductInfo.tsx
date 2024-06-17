import React, { FC, useEffect } from "react";
import { Card, CardBody, Col, Row } from "reactstrap";
import { Link } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "Redux/hooks";
import { getUserDateString } from "Helpers/GetUserDateString";
import { getProductRequest, productSelectors } from "modules/product";
import ProductInfoSkeleton from "./ProductInfoSkeleton";

import s from "./ProductInfo.module.scss";

interface IProductInfo {
    productId: string;
}

const ProductInfo: FC<IProductInfo> = ({ productId }) => {
    const { pending, error } = useAppSelector(productSelectors.getProductState);
    const { id, name, description, startDate, endDate, customer, projects } = useAppSelector(
        productSelectors.getProductInfo
    );
    const dispatch = useAppDispatch();
    const startDev = getUserDateString(startDate);
    const endDev = endDate ? getUserDateString(endDate) : "в разработке";

    useEffect(() => {
        if (id !== productId) {
            dispatch(getProductRequest(productId));
        }
    }, []);

    if (pending) {
        return <ProductInfoSkeleton />;
    } else if (error) {
        return (
            <Col>
                <Row>
                    <h1>{error}</h1>
                </Row>
            </Col>
        );
    }

    return (
        <Row className={s.product_info}>
            <Col xl={12}>
                <h1 className={s.name}>{name}</h1>
            </Col>
            <Col xl={12}>
                <h2>
                    Разработка:{" "}
                    <span className={s.develop_duration}>
                        {startDev} - {endDev}
                    </span>
                </h2>
            </Col>
            <Col xl={12}>
                <h2>
                    Заказчик: <span className={s.develop_duration}>{customer.name}</span>
                </h2>
            </Col>
            <Col xl={12}>
                <Card>
                    <CardBody className={s.description}>{description}</CardBody>
                </Card>
            </Col>
            {projects.length > 0 && (
                <Col xl={12}>
                    <h2>Проекты</h2>
                    <Card>
                        <CardBody>
                            <ul className={s.projects__list}>
                                {projects.map((p, i) => {
                                    return (
                                        <li
                                            key={p.id}
                                            className={s.project_info__li}
                                            style={{ borderRadius: "10px" }}
                                        >
                                            <Link
                                                className={s.project_info}
                                                to={`/projects/${p.id}`}
                                            >
                                                <h4>
                                                    {i + 1}. {p.name}
                                                </h4>
                                                <span>{p.startDate.getFullYear()}</span>
                                            </Link>
                                        </li>
                                    );
                                })}
                            </ul>
                        </CardBody>
                    </Card>
                </Col>
            )}
        </Row>
    );
};

export default ProductInfo;
