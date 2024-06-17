import { FC } from "react";
import { Container } from "reactstrap";
import { ApolloProvider } from "@apollo/client";
import { marketClient, MarketProductListInfo } from "modules/market";

const MarketProductListPage: FC = () => {
    return (
        <ApolloProvider client={marketClient}>
            <Container fluid={false}>
                <MarketProductListInfo />
            </Container>
        </ApolloProvider>
    );
};

export default MarketProductListPage;
