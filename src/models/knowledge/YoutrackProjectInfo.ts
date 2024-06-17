import { YoutrackProjectMember, YoutrackProjectMemberResponse } from "./YoutrackProjectMember";
import { YoutrackIssueInfo, YoutrackIssueInfoResponse } from "./YoutrackIssueInfo";

export type YoutrackProjectInfo = {
    articles: number;
    id: string;
    youtrackId: string;
    name: string;
    shortName: string;
    description: string;
    leaderId: string;
    leader: YoutrackProjectMember | null;
    issues: YoutrackIssueInfo[];
    iconUrl: string | null;
    members: YoutrackProjectMember[];
};

export type YoutrackProjectInfoResponse = Omit<YoutrackProjectInfo, "leader" | "issues" | "members"> & {
    leader: YoutrackProjectMemberResponse | null;
    issues: YoutrackIssueInfoResponse[];
    members: YoutrackProjectMemberResponse[];
};
