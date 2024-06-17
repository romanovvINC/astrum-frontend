import { FilterElement, FilterState, MainFilterState } from "models/filter/FilterState";
import { FilterRequest } from "models/filter/FilterRequest";

export const reduceFilter = (filterObj: FilterState, elem: FilterElement): FilterState => {
    const result: FilterState = JSON.parse(JSON.stringify(filterObj));
    const filterKeys = Object.keys(result);
    const payloadFilterKey = Object.keys(elem)[0];
    if (filterKeys.includes(payloadFilterKey)) {
        const index = result[payloadFilterKey].findIndex(e => e === elem[payloadFilterKey]);
        if (index !== -1) {
            result[payloadFilterKey].splice(index, 1);
        } else {
            result[payloadFilterKey].push(elem[payloadFilterKey]);
        }
    } else {
        result[payloadFilterKey] = [elem[payloadFilterKey]];
    }
    return result;
};

export const getStringParamsFromFilter = (filter: FilterRequest): string => {
    let res = "";

    if (filter && filter.params) {
        Object.keys(filter.params).forEach(p => {
            filter.params?.[p].forEach(r => {
                res += `${p}=${r}&`;
            });
        });
    }

    if (!filter.predicate || filter.predicate === "") {
        res = res.slice(0, -1);
    }
    return res;
};

export const mapFilterToApi = (filter: MainFilterState): FilterRequest => {
    let result: object = Object.keys(filter.filterParams).length === 0 ? {} : { params: filter.filterParams };
    if (filter.predicate?.length > 0) {
        result = { ...result, predicate: filter.predicate };
    }
    return result;
};
