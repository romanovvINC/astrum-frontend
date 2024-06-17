import { ProductCreateInfo, ProductCreateInfoRequestPayload } from "./ProductCreateInfo";
import { ProjectShortInfo } from "models/product/ProjectShortInfo";
import { ProjectEditInfo } from "models/product/ProjectEditInfo";
import { ProjectCreateInfo } from "models/product/ProjectCreateInfo";

export type ProductEditInfo = Omit<ProductCreateInfo, "coverImage" | "projects"> & {
    id: string;
    coverImage: string | File;
    projects: (ProjectShortInfo | ProjectEditInfo)[];
};

export type ProductEditInfoWithFullProjectInfo = Omit<ProductEditInfo, "projects"> & {
    projects: ProjectEditInfo[];
};

export type ProductEditInfoRequestPayload = Omit<ProductCreateInfoRequestPayload, "coverImage"> & {
    id: string;
    coverImage?: File;
};
