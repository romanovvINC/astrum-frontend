import { InventoryItem } from "models/inventory/InventoryItem";
import { MainFilterState } from "models/filter/FilterState";

export type GetInventoryListRequest = {
    type: string;
    payload: MainFilterState;
};

export type GetInventoryListSuccess = {
    type: string;
    payload: InventoryItem[];
};

export type GetInventoryListFailure = {
    type: string;
    payload: string;
};
