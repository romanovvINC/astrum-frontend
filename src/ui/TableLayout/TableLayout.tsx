import React, { CSSProperties, FC } from "react";

import s from "./TableLayout.module.scss";
import classNames from "classnames";

interface ITableLayoutProps {
    theadData: TableColumn[];
    tbodyData: string[][];
}

export type TableColumn = {
    className?: string;
    style?: CSSProperties;
    name: string;
};

const TableLayout: FC<ITableLayoutProps> = ({ theadData, tbodyData }) => {
    return (
        <table className={s.table}>
            <thead>
                <tr className={s.table__row}>
                    {theadData.map((item, index) => {
                        return (
                            <th
                                className={classNames(s.table__data, item.className)}
                                style={item.style}
                                key={index}
                            >
                                {item.name}
                            </th>
                        );
                    })}
                </tr>
            </thead>
            <tbody>
                {tbodyData.map((row, i) => {
                    return (
                        <tr
                            className={s.table__row}
                            key={i}
                        >
                            {row.map((elem, index) => {
                                return (
                                    <td
                                        className={s.table__data}
                                        key={index}
                                    >
                                        {elem}
                                    </td>
                                );
                            })}
                        </tr>
                    );
                })}
            </tbody>
        </table>
    );
};

export default TableLayout;
