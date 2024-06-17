import React, { FC, useCallback, useState } from "react";
import FindFilter from "./FindFilter";
import { FilterElement, MainFilterState } from "models/filter/FilterState";
import { FilterVariant } from "models/filter/FilterVariant";

import s from "./Filter.module.css";

interface IFilterProps {
    title: string;
    filter: MainFilterState;
    filterVariants?: FilterVariant[];
    onSetPredicate: (predicate: string) => void;
    onSetFilter: (filter: FilterElement) => void;
    onClickSearch?: () => void;
}

const Filter: FC<IFilterProps> = props => {
    const [isOpen, setIsOpen] = useState(false);

    const onClickHandler = useCallback(() => setIsOpen(prev => !prev), []);

    return (
        <div className={`md-sidebar ${s.filter_sidebar}`}>
            <button
                style={{ fontFamily: "Rubik, sans serif" }}
                className="btn btn-primary md-sidebar-toggle"
                onClick={onClickHandler}
            >
                Фильтрация
            </button>
            <div
                className={`md-sidebar-aside job-left-aside custom-scrollbar ${isOpen ? "open" : ""} ${
                    s.sidebar_container
                }`}
            >
                <div
                    className={`default-according style-1 faq-accordion job-accordion ${s.sidebar}`}
                    id="accordionoc"
                >
                    <FindFilter {...props} />
                </div>
            </div>
        </div>
    );
};

export default Filter;
