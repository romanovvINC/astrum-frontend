import { FC } from "react";
import { Col, Row } from "reactstrap";
import { InventoryCardSkeleton } from "./InventoryCard";

const InventoryListSkeleton: FC = () => {
    return (
        <Row>
            <Col xl={6}>
                <InventoryCardSkeleton />
            </Col>
            <Col xl={6}>
                <InventoryCardSkeleton />
            </Col>
            <Col xl={6}>
                <InventoryCardSkeleton />
            </Col>
            <Col xl={6}>
                <InventoryCardSkeleton />
            </Col>
        </Row>
    );
};

export default InventoryListSkeleton;
