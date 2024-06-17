import { FC } from "react";
import { Col, Container, Row } from "reactstrap";
import { ApolloProvider } from "@apollo/client";
import { marketOrderClient, MarketOrderListInfo } from "modules/market";

const MarketOrderListPage: FC = () => {
    return (
        <ApolloProvider client={marketOrderClient}>
            <Container fluid={false}>
                <Row>
                    <Col sm={12}>
                        <MarketOrderListInfo />
                    </Col>
                </Row>
            </Container>
        </ApolloProvider>
    );
};

export default MarketOrderListPage;
