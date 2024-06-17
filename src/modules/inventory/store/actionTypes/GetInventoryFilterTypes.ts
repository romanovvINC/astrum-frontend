import { FilterVariant } from "models/filter/FilterVariant";

export type GetInventoryFilterSuccess = {
    type: string;
    payload: FilterVariant[];
};

export type GetInventoryFilterFailure = {
    type: string;
    payload: string;
};
