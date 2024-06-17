import { FC } from "react";
import Skeleton from "react-loading-skeleton";
import { Row, Col } from "reactstrap";

import s from "./StatisticsSkeleton.module.scss";

const StatisticsSkeleton: FC = () => {
    return (
        <Row>
            <Col md={4}>
                <Skeleton className={s.stats} />
            </Col>
            <Col md={4}>
                <Skeleton className={s.stats} />
            </Col>
            <Col md={4}>
                <Skeleton className={s.stats} />
            </Col>
        </Row>
    );
};

export default StatisticsSkeleton;
