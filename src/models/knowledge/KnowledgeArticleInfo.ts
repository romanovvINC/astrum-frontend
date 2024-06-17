import { YoutrackProjectMember, YoutrackProjectMemberResponse } from "./YoutrackProjectMember";
import { YoutrackProjectInfo, YoutrackProjectInfoResponse } from "./YoutrackProjectInfo";
import { YoutrackAttachment } from "./YoutrackAttachment";

export type KnowledgeArticleInfo = {
    id: string;
    title: string;
    description: string;
    content: string;
    authorId: string;
    author: YoutrackProjectMember | null;
    project: YoutrackProjectInfo | null;
    parentArticle: string;
    childArticlesId: string[];
    comments: {
        id: string;
        authorId: string;
        author: YoutrackProjectMember;
        text: string;
        attachments: YoutrackAttachment[];
    }[];
    attachments: YoutrackAttachment[];
    isNew: boolean;
};

export type KnowledgeArticleInfoResponse = Omit<KnowledgeArticleInfo, "author" | "project" | "comments"> & {
    author: YoutrackProjectMemberResponse | null;
    project: YoutrackProjectInfoResponse | null;
    comments: {
        id: string;
        authorId: string;
        author: YoutrackProjectMemberResponse;
        text: string;
        attachments: YoutrackAttachment[];
    }[];
};
