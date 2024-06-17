import React, { FC } from "react";
import Skeleton from "react-loading-skeleton";
import { Col, Row } from "reactstrap";

import classNames from "classnames";
import s from "./ProjectInfo.module.scss";

const ProjectInfoSkeleton: FC = () => {
    return (
        <Row>
            <Col xl={12}>
                <Skeleton className={classNames(s.skeleton, s.name)} />
            </Col>
            <Col xl={12}>
                <Skeleton className={classNames(s.skeleton, s.develop_duration)} />
            </Col>
            <Col xl={12}>
                <Skeleton className={classNames(s.skeleton, s.description)} />
            </Col>
            <Col
                xl={12}
                className={s.custom_field}
            >
                <Skeleton className={classNames(s.skeleton, s.name)} />
                <Skeleton className={classNames(s.skeleton, s.value)} />
            </Col>
            <Col
                xl={12}
                className={s.custom_field}
            >
                <Skeleton className={classNames(s.skeleton, s.name)} />
                <Skeleton className={classNames(s.skeleton, s.value)} />
            </Col>
            <Col xl={12}>
                <Skeleton className={classNames(s.skeleton, s.members)} />
            </Col>
        </Row>
    );
};

export default ProjectInfoSkeleton;
