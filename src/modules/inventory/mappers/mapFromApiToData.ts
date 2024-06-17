import { InventoryItem, InventoryItemResponse } from "models/inventory/InventoryItem";
import { InventoryTemplate, InventoryTemplateResponse } from "models/inventory/InventoryTemplate";

export const mapFromInventoryTemplateResponseToDate = (template: InventoryTemplateResponse): InventoryTemplate => {
    const { dateCreated, dateModified, dateDeleted, ...rest } = template;
    return {
        ...rest,
        dateCreated: dateCreated ? new Date(dateCreated) : null,
        dateModified: dateModified ? new Date(dateModified) : null,
        dateDeleted: dateDeleted ? new Date(dateDeleted) : null,
    };
};

export const mapFromInventoryItemResponseToData = (item: InventoryItemResponse): InventoryItem => {
    const { dateCreated, dateModifed, template, ...rest } = item;
    const resultTemplate = template ? mapFromInventoryTemplateResponseToDate(template) : null;
    return {
        ...rest,
        template: resultTemplate,
        dateCreated: new Date(dateCreated),
        dateModifed: dateModifed ? new Date(dateModifed) : null,
    };
};

export const mapFromInventoryItemResponseListToData = (items: InventoryItemResponse[]): InventoryItem[] => {
    return items.map(mapFromInventoryItemResponseToData);
};
