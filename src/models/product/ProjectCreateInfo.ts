import { ProjectMember, ProjectMemberRequestPayload } from "./ProjectMember";
import { CustomField, CustomFieldRequest } from "models/CustomField";

export type ProjectCreateInfo = {
    id?: string;
    name: string;
    description: string;
    startDate: Date;
    endDate: Date | null;
    productId: string;
    members: ProjectMember[];
    customFields: CustomField[];
};

export type ProjectCreateInfoRequestPayload = {
    id?: string;
    name: string;
    description: string;
    startDate: string;
    endDate?: string;
    productId: string;
    members: ProjectMemberRequestPayload[];
    customFields: CustomFieldRequest[];
};
