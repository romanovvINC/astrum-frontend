import { FC } from "react";
import { Col, Row } from "reactstrap";
import Skeleton from "react-loading-skeleton";

import s from "./TermsSkeleton.module.scss";

const TermsSkeleton: FC = () => {
    return (
        <div className={s.terms}>
            <Row>
                <Skeleton className={s.amount} />
                <Skeleton className={s.term} />
                <Skeleton className={s.term} />
                <Skeleton className={s.term} />
            </Row>
        </div>
    );
};

export default TermsSkeleton;
