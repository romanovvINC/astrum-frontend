import React, { FC } from "react";
import Skeleton from "react-loading-skeleton";
import { Col, Row } from "reactstrap";
import s from "./ProductInfo.module.scss";
import classNames from "classnames";

const ProductInfoSkeleton: FC = () => {
    return (
        <Row>
            <Col xl={12}>
                <Skeleton className={classNames(s.skeleton, s.name)} />
            </Col>
            <Col xl={12}>
                <Skeleton className={classNames(s.skeleton, s.develop_duration)} />
            </Col>
            <Col xl={12}>
                <Skeleton className={classNames(s.skeleton, s.customer)} />
            </Col>
            <Col xl={12}>
                <Skeleton className={classNames(s.skeleton, s.description)} />
            </Col>
            <Col xl={12}>
                <Skeleton className={classNames(s.skeleton, s.projects)} />
            </Col>
        </Row>
    );
};

export default ProductInfoSkeleton;
