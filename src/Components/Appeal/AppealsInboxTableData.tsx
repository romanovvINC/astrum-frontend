import React, { Fragment } from "react";
import DataTable from "react-data-table-component";
import { appealColumns, appealData } from "./appealsInbox-list";
import { Appeal } from "../../Redux/Reducers/AppealReducer/Types/Appeal";
import MyAppealsActionColumn from "./MyAppealsActionColumn";
import s from "../../MyPages/AppealPage/AppealPage.module.css";

const AppealsInboxTableData = (props: any) => {
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
    const data = props.appealsData.map((item: Appeal) => {
        const statusString = appealStatusString(item.status);
        let category = "";
        if (item.categories.length > 0) category = item.categories[0].category;
        return {
            sender: <p>{item.fromName}</p>,
            title: <p>{item.title}</p>,
            status: <p>{statusString}</p>,
            //eslint-disable-next-line
            //@ts-ignore
            date: <p>{item.dateCreated}</p>,
            category: <p>{category}</p>,
            action: (
                <MyAppealsActionColumn
                    data={item}
                    isActive={true}
                ></MyAppealsActionColumn>
            ),
        };
    });
    return (
        <Fragment>
            <div className="table-responsive product-table">
                {data.length > 0 ? (
                    <DataTable
                        noHeader
                        pagination
                        paginationServer
                        paginationComponentOptions={{
                            rowsPerPageText: "Строк на страницу",
                            noRowsPerPage: false,
                            rangeSeparatorText: "из",
                            selectAllRowsItem: false,
                            selectAllRowsItemText: "",
                        }}
                        columns={appealColumns}
                        data={data}
                    />
                ) : (
                    <div className={s.tablePlaceholder}>{"Входящие заявки отсутствуют"}</div>
                )}
            </div>
        </Fragment>
    );
};
export default AppealsInboxTableData;
