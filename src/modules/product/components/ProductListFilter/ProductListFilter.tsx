import React, { FC, useCallback } from "react";
import { useAppDispatch, useAppSelector } from "Redux/hooks";
import { productSelectors, getProductListRequest, setFilter, setPredicate } from "modules/product";
import { Filter } from "ui/Filter";
import { FilterElement } from "models/filter/FilterState";

const ProductListFilter: FC = () => {
    const { filter } = useAppSelector(productSelectors.getProductListInfo);
    const dispatch = useAppDispatch();

    const clickSearchArticlesHandler = () => dispatch(getProductListRequest({ ...filter }));

    const setFilterSearchHandler = useCallback((predicate: string) => dispatch(setPredicate(predicate)), []);

    const setFilterHandler = useCallback((filterParams: FilterElement) => dispatch(setFilter(filterParams)), []);

    return (
        <Filter
            title="Найти продукт"
            filter={filter}
            onSetFilter={setFilterHandler}
            onSetPredicate={setFilterSearchHandler}
            onClickSearch={clickSearchArticlesHandler}
        />
    );
};

export default ProductListFilter;
