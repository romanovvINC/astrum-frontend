export enum InventoryStatus {
    isUsed,
    inStock,
    absent,
}

export const InventoryStatusName = {
    [InventoryStatus.isUsed]: "Испольуется",
    [InventoryStatus.inStock]: "На складе",
    [InventoryStatus.absent]: "Отсутствует",
} as const;
