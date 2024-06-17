import React, { FC, useEffect, useState } from "react";
import { Card, CardBody, CardHeader } from "reactstrap";
import { useQuery } from "@apollo/client/react";
import { useAppDispatch, useAppSelector } from "Redux/hooks";
import { MarketOrder } from "models/market/MarketOrder";
import { authSelectors } from "modules/auth";
import { getMarketOrders, getMarketOrdersSuccess, marketSelectors } from "modules/market";
import OrderTableUserData from "./OrderTableUserData";

const MarketOrderListInfo: FC = () => {
    const [totalCount, setTotalCount] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);
    const [cursor, setCursor] = useState("");
    const [take, setTake] = useState("first:10");

    const { userId } = useAppSelector(authSelectors.getBasicInfo);
    const { pending, orders } = useAppSelector(marketSelectors.getMarketState);
    const dispatch = useAppDispatch();
    const { data, loading, error, refetch } = useQuery(getMarketOrders(userId, take, cursor, ""));

    useEffect(() => {
        if (data) {
            const orders: MarketOrder[] = [];
            let edges = data.orderList.edges;
            edges.forEach((cal: any) => {
                orders.push({
                    id: String(cal.node.id),
                    userId: cal.node.userId,
                    comment: cal.node.comment,
                    sellerResponse: cal.node.sellerResponse,
                    status: cal.node.status,
                    orderProducts: cal.node.orderProducts,
                    cursor: cal.cursor,
                });
            });
            dispatch(getMarketOrdersSuccess({ orders }));
        }
    }, [data]);

    function changePage(newPage: number) {
        let newCursor = "";
        let newTake = "first:10";
        let diff = totalCount / 10;
        if (newPage === Math.ceil(diff)) {
            newTake = `last:${totalCount % 10}`;
        }
        if (newPage > currentPage) {
            newCursor = `after: "${orders[orders.length - 1].cursor}"`;
        } else if (newPage != 1 && newPage < currentPage) {
            newCursor = `before: "${orders[0].cursor}"`;
        }
        setCurrentPage(newPage);
        setCursor(newCursor);
        setTake(newTake);
        refetch();
    }

    return (
        <Card>
            <CardHeader className="pb-0">
                <h5>Список Заказов</h5>
            </CardHeader>
            <CardBody>
                <OrderTableUserData
                    orderData={orders}
                    totalCount={totalCount}
                    onChangePage={changePage}
                />
            </CardBody>
        </Card>
    );
};

export default MarketOrderListInfo;
