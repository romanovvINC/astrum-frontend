import { YoutrackProjectMember, YoutrackProjectMemberResponse } from "./YoutrackProjectMember";
import { YoutrackAttachment } from "./YoutrackAttachment";

export type YoutrackIssueInfo = {
    id: string;
    project: string;
    summary: string;
    description: string;
    reporterId: string;
    updaterId: string;
    draftOwnerId: string;
    reporter: YoutrackProjectMember;
    updater: YoutrackProjectMember;
    draftOwner: YoutrackProjectMember;
    url: string | null;
    isDraft: boolean;
    comments: {
        id: string;
        authorId: string;
        author: YoutrackProjectMember;
        text: string;
        attachments: YoutrackAttachment[];
    }[];
    commentsCount: number;
    tags: { id: string }[];
    watcherIds: string[];
    attachments: YoutrackAttachment[];
    subtasks: string[];
    parent: string;
};

export type YoutrackIssueInfoResponse = Omit<YoutrackIssueInfo, "reporter" | "updater" | "draftOwner" | "comments"> & {
    reporter: YoutrackProjectMemberResponse;
    updater: YoutrackProjectMemberResponse;
    draftOwner: YoutrackProjectMemberResponse;
    comments: {
        id: string;
        authorId: string;
        author: YoutrackProjectMemberResponse;
        text: string;
        attachments: YoutrackAttachment[];
    }[];
};
