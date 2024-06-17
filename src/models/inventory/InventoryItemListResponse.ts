import { InventoryItemResponse } from "./InventoryItem";

export type InventoryItemListResponse = {
    inventoryItems: InventoryItemResponse[];
    index: number;
    nextExist: boolean;
};
