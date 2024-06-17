import { ProjectCreateInfo, ProjectCreateInfoRequestPayload } from "./ProjectCreateInfo";

export type ProjectEditInfo = ProjectCreateInfo & { id: string };

export type ProjectEditInfoRequestPayload = ProjectCreateInfoRequestPayload & { id: string };
