import { FC } from "react";
import { Row, Col } from "reactstrap";
import Skeleton from "react-loading-skeleton";

import s from "./PracticeSkeleton.module.scss";

const PracticeSkeleton: FC = () => {
    return (
        <Row>
            <Col md={{ offset: 1, size: 1 }}>
                <Skeleton className={s.progress} />
            </Col>

            <Col md={8}>
                <Row>
                    <Skeleton className={s.question} />
                </Row>
                <Row>
                    <Skeleton className={s.option} />
                </Row>
                <Row>
                    <Skeleton className={s.option} />
                </Row>
                <Row>
                    <Skeleton className={s.option} />
                </Row>
            </Col>
        </Row>
    );
};

export default PracticeSkeleton;
