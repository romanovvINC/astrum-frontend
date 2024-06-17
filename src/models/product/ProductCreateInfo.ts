import { Customer } from "./Customer";
import { ProjectCreateInfo, ProjectCreateInfoRequestPayload } from "./ProjectCreateInfo";
import { ProjectShortInfo } from "models/product/ProjectShortInfo";
import { ProjectEditInfo } from "models/product/ProjectEditInfo";

export type ProductCreateInfo = {
    id?: string;
    name: string;
    description: string;
    customer: Customer;
    startDate: Date;
    endDate: Date | null;
    coverImage: File;
    projects: ProjectEditInfo[];
};

export type ProductCreateInfoRequestPayload = {
    name: string;
    description: string;
    customerId: string;
    startDate: string;
    endDate?: string;
    coverImage: File;
    projects: ProjectCreateInfoRequestPayload[];
};
