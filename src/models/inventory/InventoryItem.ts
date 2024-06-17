import { InventoryUser } from "./InventoryUser";
import { InventoryCharacteristic } from "./InventoryCharacteristic";
import { InventoryStatus } from "./InventoryStatus";
import { InventoryTemplate, InventoryTemplateResponse } from "./InventoryTemplate";

export type InventoryItem = {
    id: string;
    dateCreated: Date;
    dateModifed: Date | null;
    model: string;
    isPublic: boolean;
    serialNumber: string;
    status: InventoryStatus;
    templateId: string;
    template: InventoryTemplate | null;
    state: number; // hp техники
    user: InventoryUser | null;
    linkImage: string | null;
    pictureId: string | null;
    userId: string;
    characteristics: InventoryCharacteristic[];
};

export type InventoryItemResponse = Omit<InventoryItem, "dateCreated" | "dateModifed" | "template"> & {
    dateCreated: string;
    dateModifed: string | null;
    template: InventoryTemplateResponse | null;
};
