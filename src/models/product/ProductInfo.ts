import { Customer } from "./Customer";
import { ProjectShortInfo, ProjectShortInfoResponse } from "./ProjectShortInfo";

export type ProductInfo = {
    id: string;
    name: string;
    description: string;
    customer: Customer;
    startDate: Date;
    endDate: Date | null;
    coverUrl: string;
    projects: ProjectShortInfo[];
};

export type ProductInfoResponse = {
    id: string;
    name: string;
    description: string;
    customer: Customer;
    startDate: string;
    endDate: string | null;
    coverUrl: string;
    projects: ProjectShortInfoResponse[];
};
