import { InventoryItem } from "./InventoryItem";
import { MainFilterState } from "models/filter/FilterState";
import { FilterVariant } from "models/filter/FilterVariant";

export type InventoryState = {
    pending: boolean;
    pendingFilter: boolean;
    pendingAsync: boolean;
    canPendingAsync: boolean;
    startIndex: number;
    count: number;
    inventoryList: InventoryItem[];
    filter: MainFilterState;
    filterVariants: FilterVariant[];
    error: string | null;
    errorFilter: string | null;
};
