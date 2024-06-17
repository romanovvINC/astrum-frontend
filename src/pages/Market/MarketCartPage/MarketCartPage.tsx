import { FC } from "react";
import { Col, Container, Row } from "reactstrap";
import { ApolloProvider } from "@apollo/client";
import { useAppSelector } from "Redux/hooks";
import { authSelectors } from "modules/auth";
import { cartClient, MarketCartInfo } from "modules/market";

const MarketCartPage: FC = () => {
    const { userId } = useAppSelector(authSelectors.getBasicInfo);
    return (
        <ApolloProvider client={cartClient}>
            <Container fluid={false}>
                <Row>
                    <Col sm={12}>
                        <MarketCartInfo userId={userId} />
                    </Col>
                </Row>
            </Container>
        </ApolloProvider>
    );
};

export default MarketCartPage;
