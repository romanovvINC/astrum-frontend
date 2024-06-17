import { FC, useEffect } from "react";
import { Card, CardBody, CardHeader, Row } from "reactstrap";
import { useQuery } from "@apollo/client/react";
import { getMarketBasket } from "modules/market";
import CartData from "./CartData";

interface IMarketCartInfoProps {
    userId: string;
}

const MarketCartInfo: FC<IMarketCartInfoProps> = ({ userId }) => {
    const { loading, data, error, refetch } = useQuery(getMarketBasket(userId));

    useEffect(() => {
        refetch();
    }, []);

    if (loading) {
        return (
            <Card>
                <CardBody>Загрузка...</CardBody>
            </Card>
        );
    }

    return (
        <Card>
            <CardHeader className="pb-0">
                <h5>Корзина</h5>
            </CardHeader>
            <CardBody className="cart">
                <Row>
                    <CartData data={data} />
                </Row>
            </CardBody>
        </Card>
    );
};

export default MarketCartInfo;
