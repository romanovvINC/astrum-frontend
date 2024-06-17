import { FilterElement } from "./FilterState";

export type SetPredicate = {
    type: string;
    payload: string;
};

export type SetFilter = {
    type: string;
    payload: FilterElement;
};
