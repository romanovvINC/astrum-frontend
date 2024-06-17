import { InventoryCharacteristic } from "./InventoryCharacteristic";

export type InventoryTemplate = {
    id: string;
    title: string;
    pictureId: string;
    characteristics: InventoryCharacteristic[];
    version: number; // ??
    dateCreated: Date | null;
    dateModified: Date | null;
    dateDeleted: Date | null;
    createdBy: string;
    modifiedBy: string;
    isDeleted: boolean;
};

export type InventoryTemplateResponse = Omit<InventoryTemplate, "dateCreated" | "dateModified" | "dateDeleted"> & {
    dateCreated: string | null;
    dateModified: string | null;
    dateDeleted: string | null;
};

export type InventoryShortTemplate = Pick<
    InventoryTemplate,
    "id" | "title" | "dateCreated" | "dateModified" | "pictureId" | "characteristics"
>;

export type InventoryShortTemplateResponse = Omit<InventoryShortTemplate, "dateCreated" | "dateModified"> & {
    dateCreated: string | null;
    dateModified: string | null;
};
