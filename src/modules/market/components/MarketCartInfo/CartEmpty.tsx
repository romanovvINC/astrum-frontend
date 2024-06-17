import React from "react";
import { Col, Container, Row } from "reactstrap";

const EmptyCart = () => {
    return (
        <section className="cart-section section-b-space">
            <Container fluid={true}>
                <Row>
                    <Col sm="12">
                        <div>
                            <Col
                                sm="12"
                                className="empty-cart-cls text-center"
                            >
                                <h3>
                                    <strong>Ваша корзина пока пуста</strong>
                                </h3>
                                <h4>Вы можете начать покупки с главной страницы магазина.</h4>
                            </Col>
                        </div>
                    </Col>
                </Row>
            </Container>
        </section>
    );
};
export default EmptyCart;
