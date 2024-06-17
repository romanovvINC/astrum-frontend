import { ProjectMember } from "./ProjectMember";
import { CustomField } from "models/CustomField";

export type ProjectInfo = {
    id: string;
    name: string;
    productName: string;
    description: string;
    isDeletable: boolean;
    startDate: Date;
    endDate: Date | null;
    productId: string;
    customFields: CustomField[];
    members: ProjectMember[];
};

export type ProjectInfoResponse = Omit<ProjectInfo, "startDate" | "endDate"> & {
    startDate: string;
    endDate: string | null;
};
