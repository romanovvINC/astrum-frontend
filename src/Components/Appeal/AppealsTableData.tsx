import React from "react";
import DataTable from "react-data-table-component";
import MyAppealsActionColumn from "./MyAppealsActionColumn";
import { Appeal } from "Redux/Reducers/AppealReducer/Types/Appeal";
import s from "../../MyPages/AppealPage/AppealPage.module.css";
import { useAppSelector } from "Redux/hooks";
import { authSelectors } from "modules/auth";

const AppealsTableData = (props: any) => {
    const { userId } = useAppSelector(authSelectors.getBasicInfo);
    function appealStatusString(status: any) {
        switch (status) {
            case "REQUESTED":
            case 0:
                return "Создано";
            case "APPLIED":
            case 1:
                return "Принято";
            case "COMPLETED":
            case 2:
                return "Завершёно";
            case "REJECTED":
            case 3:
                return "Отказано";
        }
    }

    function sort(e: any, b: any) {
        console.log(b);
    }

    const appealColumns = [
        {
            name: "Тема",
            selector: (row: any) => row.title,
            sortable: false,
            center: true,
            wrap: true,
        },
        {
            name: "Получатель",
            selector: (row: any) => row.receiver,
            sortable: false,
            center: true,
        },
        {
            name: "Дата подачи",
            selector: (row: any) => row.date,
            sortable: false,
            center: true,
        },
        {
            name: "Статус",
            selector: (row: any) => row.status,
            sortable: false,
            center: true,
        },
        {
            name: "Категория",
            selector: (row: any) => row.category,
            sortable: false,
            center: true,
        },
        {
            name: "Действия",
            selector: (row: any) => row.action,
            sortable: false,
            center: true,
        },
    ];

    const data = props.appealsData.map((item: Appeal) => {
        const statusString = appealStatusString(item.status);
        let category = "";
        if (item.categories?.length > 0) category = item.categories[0].category;
        return {
            receiver: <p>{item.toName}</p>,
            title: <p>{item.title}</p>,
            status: <p>{statusString}</p>,
            //eslint-disable-next-line
            //@ts-ignore
            date: <p>{new Date(item.dateCreated).toLocaleDateString()}</p>,
            category: <p>{category}</p>,
            action: (
                <MyAppealsActionColumn
                    data={item}
                    isActive={item.from !== userId}
                ></MyAppealsActionColumn>
            ),
        };
    });
    return (
        <div
            className="table-responsive product-table"
            style={{ fontStyle: "Rubik, sans-serif !important" }}
        >
            {data.length > 0 ? (
                <DataTable
                    noHeader
                    pagination
                    paginationServer
                    paginationTotalRows={props.totalCount}
                    onChangePage={props.onChangePage}
                    paginationComponentOptions={{
                        rowsPerPageText: "Строк на страницу",
                        noRowsPerPage: true,
                        rangeSeparatorText: "из",
                        selectAllRowsItem: true,
                        selectAllRowsItemText: "",
                    }}
                    columns={appealColumns}
                    data={data}
                />
            ) : (
                <div className={s.tablePlaceholder}>{props.empty}</div>
            )}
        </div>
    );
};
export default AppealsTableData;
