import { RootState } from "Redux/store";
import { InventoryState } from "models/inventory/InventoryState";

export const inventorySelectors = {
    getInventoryState: (state: RootState): InventoryState => state.InventoryReducer,

    getInventoryFilter: (state: RootState) => ({
        pendingFilter: state.InventoryReducer.pendingFilter,
        filter: state.InventoryReducer.filter,
        filterVariants: state.InventoryReducer.filterVariants,
    }),
};
