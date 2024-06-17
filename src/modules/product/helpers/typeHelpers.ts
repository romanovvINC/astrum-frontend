import { ProductCreateInfo } from "models/product/ProductCreateInfo";
import { ProductEditInfo } from "models/product/ProductEditInfo";
import { ProjectCreateInfo } from "models/product/ProjectCreateInfo";
import { ProjectEditInfo } from "models/product/ProjectEditInfo";
import { version } from "uuid";
import { ProjectShortInfo } from "models/product/ProjectShortInfo";

export const isProductCreateInfo = (obj: ProductCreateInfo | ProductEditInfo): obj is ProductCreateInfo => {
    return !obj.id || version(obj.id) === 1;
};

export const isProjectCreateInfo = (obj: ProjectCreateInfo | ProjectEditInfo | string): obj is ProjectCreateInfo => {
    if (typeof obj === "object") {
        return obj.id !== undefined && (obj.id === "" || version(obj.id) === 1);
    } else {
        return obj === "" || version(obj) === 1;
    }
};

export const isProjectShortInfo = (
    obj: ProjectCreateInfo | ProjectEditInfo | ProjectShortInfo
): obj is ProjectShortInfo => {
    return !((obj as ProjectEditInfo).members?.length >= 0);
};
