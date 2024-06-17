import React, { FC, useCallback } from "react";
import { Card, CardBody, CardHeader, Col } from "reactstrap";
import { Search } from "react-feather";
import { FilterVariant } from "models/filter/FilterVariant";
import { FilterElement, MainFilterState } from "models/filter/FilterState";
import { ButtonMain } from "ui/Button";
import { InputMain, InputMainOnChangeArgumentType } from "ui/Input";

import classNames from "classnames";
import s from "./FindFilter.module.scss";

interface IFindFilterProps {
    title: string;
    filter: MainFilterState;
    filterVariants?: FilterVariant[];
    onSetPredicate: (predicate: string) => void;
    onSetFilter: (filter: FilterElement) => void;
    onClickSearch?: () => void;
}

const FindFilter: FC<IFindFilterProps> = ({
    title,
    filter,
    filterVariants = [],
    onSetPredicate,
    onSetFilter,
    onClickSearch,
}) => {
    const setFilterSearchHandler = useCallback(
        (e: InputMainOnChangeArgumentType) => {
            if (e !== null && !(e instanceof Date)) {
                //TODO... Добавить debounce
                onSetPredicate(e.target.value);
            }
        },
        [onSetPredicate]
    );

    const setFilterHandler = useCallback(
        (sectionName: string, value: string) => {
            return () => onSetFilter({ [sectionName]: value });
        },
        [onSetFilter]
    );

    const clickSearchHandler = useCallback(() => onClickSearch?.(), [onClickSearch]);

    return (
        <Col
            style={{ paddingRight: 0 }}
            xl="12"
        >
            <Card className={s.filter}>
                <CardHeader>
                    <h5 className={"mb-0"}>
                        <button className={`btn btn-link ps-0 ${s.filter_header_btn}`}>{title}</button>
                    </h5>
                </CardHeader>
                <CardBody className={classNames("filter-cards-view animate-chk", s.filter_body)}>
                    <div className="job-filter">
                        <div className="faq-form">
                            <InputMain
                                type="text"
                                placeholder="Поиск"
                                value={filter.predicate}
                                onChange={setFilterSearchHandler}
                            />
                            <Search className="search-icon" />
                        </div>
                    </div>
                    <div className={s.categories}>
                        {filterVariants.map((v, i) => {
                            return (
                                <div
                                    key={`filterVariant-${v.title}-${i}`}
                                    className="categories pt-0"
                                >
                                    <header className={`learning-header ${s.categories_header}`}>
                                        <span className="f-w-600">{v.title}</span>
                                    </header>
                                    <ul className={"simple-list"}>
                                        {v.filterItems.map(f => (
                                            <li
                                                key={`filter-${f.value}`}
                                                className={classNames(s.filter_item, {
                                                    [s.active]: filter.filterParams[v.name]?.includes(f.value),
                                                })}
                                                style={{
                                                    paddingLeft: 10,
                                                    display: "flex",
                                                    justifyContent: "space-between",
                                                    alignItems: "center",
                                                }}
                                                onClick={setFilterHandler(v.name, f.value)}
                                            >
                                                <span>{f.title} </span>
                                                <span
                                                    style={{ position: "static" }}
                                                    className={`badge badge-primary pull-right ${s.span}`}
                                                >
                                                    {f.count}
                                                </span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            );
                        })}
                    </div>
                    {onClickSearch && (
                        <ButtonMain
                            className={s.submit_btn}
                            onClick={clickSearchHandler}
                        >
                            Найти
                        </ButtonMain>
                    )}
                </CardBody>
            </Card>
        </Col>
    );
};

export default FindFilter;
