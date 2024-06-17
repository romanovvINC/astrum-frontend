import { FC } from "react";
import { Col, Container, Row } from "reactstrap";
import { InventoryFilter, InventoryList } from "modules/inventory";

import s from "./InventoryListPage.module.scss";

const InventoryListPage: FC = () => {
    return (
        <Container fluid={false}>
            <Row className={s.title}>
                <h2>Инвентаризация</h2>
            </Row>
            <Row className={s.content}>
                <Col xl={8}>
                    <InventoryList />
                </Col>
                <Col xl={4}>
                    <InventoryFilter />
                </Col>
            </Row>
        </Container>
    );
};

export default InventoryListPage;
