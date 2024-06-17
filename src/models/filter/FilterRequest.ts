import { FilterState } from "./FilterState";

export type FilterRequest = {
    params?: FilterState;
    predicate?: string;
};
