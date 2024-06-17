import React, { FC, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "Redux/hooks";
import { MarketOrder, MarketOrderStatusName } from "models/market/MarketOrder";
import { marketSelectors, setMarketOrders } from "modules/market";
import DataTable from "react-data-table-component";
import { Image } from "ui/Image";

import s from "./MarketOrderListInfo.module.scss";

interface IOrderTableUserDataProps {
    orderData: MarketOrder[];
    totalCount: number;
    onChangePage: (newPage: number) => void;
}

const OrderTableUserData: FC<IOrderTableUserDataProps> = ({ orderData, totalCount, onChangePage }) => {
    const { orders } = useAppSelector(marketSelectors.getMarketState);
    const dispatch = useAppDispatch();

    useEffect(() => {
        if (orderData) {
            dispatch(setMarketOrders(orderData));
        }
    }, [orderData]);

    const products = orders.map(item => item.orderProducts).flat(1);

    const data = products.map(item => {
        const product = item.product;
        const statusString = MarketOrderStatusName[item.status];
        let imagesrc = "";
        if (product.coverUrl === undefined || product.coverUrl === null)
            imagesrc =
                "https://www.casavanity.com/modules/tea_lookbook/views/img/images/7dd432c8b0a1a7851d81077428351c08a437bd8b_watch.jpg";
        else imagesrc = product.coverUrl;
        return {
            image: (
                <Image
                    className={"img-fluid"}
                    src={imagesrc}
                    alt={""}
                />
            ),
            name: (
                <div>
                    <h6>{product.name}</h6>
                    <span>{product.summary}</span>
                </div>
            ),
            price: <p>{product.price * item.amount}</p>,
            amount: <p>{item.amount}</p>,
            status: <p>{statusString}</p>,
        };
    });

    const orderUserColumns = [
        {
            name: "Изображение",
            selector: (row: any) => row.image,
            sortable: false,
            center: true,
        },
        {
            name: "Название",
            selector: (row: any) => row.name,
            sortable: false,
            center: true,
            wrap: true,
        },
        {
            name: "Статус Заказа",
            selector: (row: any) => row.status,
            sortable: false,
            center: true,
        },
        {
            name: "Количество",
            selector: (row: any) => row.amount,
            sortable: false,
            center: true,
        },
        {
            name: "Цена",
            selector: (row: any) => row.price,
            sortable: false,
            center: true,
            wrap: true,
        },
    ];

    return (
        <div className="product-table">
            {data.length > 0 ? (
                <DataTable
                    noHeader
                    pagination
                    paginationServer
                    //paginationTotalRows={10}
                    onChangePage={onChangePage}
                    paginationComponentOptions={{
                        rowsPerPageText: "Строк на страницу",
                        noRowsPerPage: false,
                        rangeSeparatorText: "из",
                        selectAllRowsItem: false,
                        selectAllRowsItemText: "",
                    }}
                    columns={orderUserColumns}
                    data={data}
                />
            ) : (
                <div className={s.table_placeholder}>У вас нет заказов!</div>
            )}
        </div>
    );
};
export default OrderTableUserData;
