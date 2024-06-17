import { FilterRequest } from "./FilterRequest";
import { PaginationParams } from "models/filter/PaginationParams";

export type FilterWithPaginationRequest = {
    filterParams: FilterRequest;
    paginationParams: PaginationParams;
};
