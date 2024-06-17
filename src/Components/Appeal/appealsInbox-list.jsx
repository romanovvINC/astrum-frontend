import React, { useContext } from "react";
import { Link } from "react-router-dom";
import MyAppealsActionColumn from "./MyAppealsActionColumn";
import AppealsInboxActionColumn from "./AppealsInboxActionColumn";

const style = {
    width: 40,
    height: 40,
};
const style2 = {
    width: 60,
    fontSize: 13,
    padding: 3,
};

// const { productItem, symbol } = useContext(ProductContext);
// const context = useContext(FilterContext);
// const products = getVisibleproducts(productItem, context.filter);
//
export const appealData = [
    {
        sender: "Виктор Панюшкин",
        title: "Заказано",
        status: "Новая",
        date: "2022/4/19",
        category: "Оборудование",
        action: <AppealsInboxActionColumn></AppealsInboxActionColumn>,
    },
    {
        sender: "Дима Квашнин",
        title: "Заявка",
        status: "Принято",
        date: "2022/4/19",
        category: "Оборудование",
        action: <AppealsInboxActionColumn></AppealsInboxActionColumn>,
    },
];

export const appealColumns = [
    {
        name: "Тема",
        selector: row => row.title,
        sortable: true,
        center: true,
        wrap: true,
    },
    {
        name: "Отправитель",
        selector: row => row.sender,
        sortable: true,
        center: true,
    },
    {
        name: "Дата подачи",
        selector: row => row.date,
        sortable: true,
        center: true,
    },
    {
        name: "Статус",
        selector: row => row.status,
        sortable: true,
        center: true,
    },
    {
        name: "Категория",
        selector: row => row.category,
        sortable: true,
        center: true,
    },
    {
        name: "Действия",
        selector: row => row.action,
        sortable: false,
        center: true,
    },
];
