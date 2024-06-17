import React, { FC } from "react";
import { Col, Row } from "reactstrap";
import Skeleton from "react-loading-skeleton";

import classNames from "classnames";
import s from "./ArticleInfo.module.scss";

const ArticleInfoSkeleton: FC = () => {
    return (
        <Row className={s.skeleton}>
            <Col xl={12}>
                <Skeleton className={classNames(s.skeleton_item, s.date_created)} />
            </Col>
            <Col xl={12}>
                <Skeleton className={classNames(s.skeleton_item, s.name)} />
            </Col>
            <Col xl={12}>
                <Skeleton className={classNames(s.skeleton_item, s.author)} />
            </Col>
            <Col xl={12}>
                <Skeleton className={classNames(s.skeleton_item, s.category)} />
            </Col>
            <Col
                xl={12}
                className={s.tags}
            >
                <Skeleton className={classNames(s.skeleton_item, s.tag)} />
                <Skeleton className={classNames(s.skeleton_item, s.tag)} />
                <Skeleton className={classNames(s.skeleton_item, s.tag)} />
            </Col>
            <Col xl={12}>
                <Skeleton className={classNames(s.skeleton_item, s.content)} />
            </Col>
        </Row>
    );
};

export default ArticleInfoSkeleton;
