import { FC, useCallback, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "Redux/hooks";
import { FilterElement } from "models/filter/FilterState";
import { getInventoryFilterRequest, inventorySelectors, setFilter, setPredicate } from "modules/inventory";
import { Filter } from "ui/Filter";

const InventoryFilter: FC = () => {
    const { pendingFilter, filter, filterVariants } = useAppSelector(inventorySelectors.getInventoryFilter);
    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(getInventoryFilterRequest());
    }, []);

    const setPredicateHandler = useCallback((predicate: string) => dispatch(setPredicate(predicate)), []);

    const setFilterHandler = useCallback((filter: FilterElement) => dispatch(setFilter(filter)), []);

    if (pendingFilter) {
        return <div>Загрузка фильтра...</div>;
    }

    return (
        <Filter
            title={"Найти технику"}
            filter={filter}
            filterVariants={filterVariants}
            onSetPredicate={setPredicateHandler}
            onSetFilter={setFilterHandler}
        />
    );
};

export default InventoryFilter;
