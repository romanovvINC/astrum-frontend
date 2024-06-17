import React, { FC, useEffect, useMemo } from "react";
import { Card, CardBody } from "reactstrap";
import { useAppDispatch, useAppSelector } from "Redux/hooks";
import { DebtStatusName } from "models/debt/DebtStatus";
import { debtSelectors, getDebtListRequest } from "modules/debt";
import { getRequisites } from "modules/debt/helpers/getRequisites";
import { TableColumn, TableLayout } from "ui/TableLayout";

import s from "./DebtListInfo.module.scss";

interface IDebtListInfoProps {
    isRequisites: boolean;
}

const DebtListInfo: FC<IDebtListInfoProps> = ({ isRequisites }) => {
    const { pending, debts, error } = useAppSelector(debtSelectors.getDebtState);
    const tableData = useMemo(
        () => [
            debts.map(d => [
                d.dateDebt?.toLocaleDateString("ru") ?? "",
                d.debtor.nameWithSurname,
                d.borrower.nameWithSurname,
                String(d.sumDebt),
                d.description,
                DebtStatusName[d.status],
            ]),
            getRequisites(debts),
        ],
        [debts]
    );
    const tableHeaders: TableColumn[] = isRequisites
        ? [
              { name: "Сотрудник", style: { textAlign: "center" } },
              { name: "Реквизиты", style: { textAlign: "center" } },
          ]
        : [
              { name: "Дата", style: { textAlign: "center" } },
              { name: "Кто" },
              { name: "Кому" },
              { name: "Сколько" },
              { name: "За что" },
              { name: "Статус" },
          ];
    const resultTableData = isRequisites ? tableData[1] : tableData[0];
    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(getDebtListRequest());
    }, []);

    if (pending && resultTableData.length === 0) {
        return <div>Загрузка...</div>;
    }

    if (resultTableData.length === -1) {
        return (
            <Card>
                <CardBody className={s.card_body}>
                    <h2>Данных нет</h2>
                </CardBody>
            </Card>
        );
    }

    return (
        <Card>
            <CardBody className={s.card_body}>
                <TableLayout
                    theadData={tableHeaders}
                    tbodyData={resultTableData}
                />
            </CardBody>
        </Card>
    );
};

export default DebtListInfo;
