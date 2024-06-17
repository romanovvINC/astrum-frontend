import { YoutrackProjectInfo, YoutrackProjectInfoResponse } from "models/knowledge/YoutrackProjectInfo";
import { YoutrackProjectMember, YoutrackProjectMemberResponse } from "models/knowledge/YoutrackProjectMember";
import { YoutrackIssueInfo, YoutrackIssueInfoResponse } from "models/knowledge/YoutrackIssueInfo";
import { KnowledgeArticleInfo, KnowledgeArticleInfoResponse } from "models/knowledge/KnowledgeArticleInfo";

export const mapFromKnowledgeProjectMemberResponseToData = (
    member: YoutrackProjectMemberResponse
): YoutrackProjectMember => {
    const { birthDate, ...rest } = member;
    return {
        ...rest,
        birthDate: birthDate ? new Date(birthDate) : null,
    };
};

export const mapFromKnowledgeIssueInfoResponseToData = (issue: YoutrackIssueInfoResponse): YoutrackIssueInfo => {
    const { reporter, updater, draftOwner, comments, ...rest } = issue;
    const resultComments = comments.map(c => ({
        ...c,
        author: mapFromKnowledgeProjectMemberResponseToData(c.author),
    }));
    return {
        ...rest,
        reporter: mapFromKnowledgeProjectMemberResponseToData(reporter),
        updater: mapFromKnowledgeProjectMemberResponseToData(updater),
        draftOwner: mapFromKnowledgeProjectMemberResponseToData(draftOwner),
        comments: resultComments,
    };
};

export const mapFromKnowledgeProjectInfoResponseToData = (
    projectInfo: YoutrackProjectInfoResponse
): YoutrackProjectInfo => {
    const { leader, issues, members, ...rest } = projectInfo;
    const resultLeader = leader ? mapFromKnowledgeProjectMemberResponseToData(leader) : null;
    const resultIssues = issues?.map(mapFromKnowledgeIssueInfoResponseToData);
    const resultMembers = members?.map(mapFromKnowledgeProjectMemberResponseToData);
    return {
        ...rest,
        leader: resultLeader,
        issues: resultIssues,
        members: resultMembers,
    };
};

export const mapFromKnowledgeArticleInfoResponseToData = (
    article: KnowledgeArticleInfoResponse
): KnowledgeArticleInfo => {
    const { author, project, comments, ...rest } = article;
    const resultAuthor = author ? mapFromKnowledgeProjectMemberResponseToData(author) : null;
    const resultProject = project ? mapFromKnowledgeProjectInfoResponseToData(project) : null;
    const resultComments = comments.map(c => ({
        ...c,
        author: mapFromKnowledgeProjectMemberResponseToData(c.author),
    }));
    return {
        ...rest,
        author: resultAuthor,
        project: resultProject,
        comments: resultComments,
    };
};
