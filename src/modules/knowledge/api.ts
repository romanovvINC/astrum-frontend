import { AxiosResponse } from "axios";
import baseApi from "Api/BaseApi";
import { YoutrackProjectInfoResponse } from "models/knowledge/YoutrackProjectInfo";

const baseProjectIssueUrl = "/tracker-project/tracker-issue";
const baseProjectUrl = "/tracker-project/tracker-project";
const baseArticleUrl = "/tracker-article/tracker-article";

export const getYoutrackProjectArticleList = (projectId: string): Promise<AxiosResponse<void>> => {
    const url = `${baseArticleUrl}/articles/${projectId}`;
    return baseApi.get(url);
};

export const getYoutrackProjectArticle = (id: string): Promise<AxiosResponse<void>> => {
    const url = `${baseArticleUrl}/article/${id}`;
    return baseApi.get(url);
};

export const getYoutrackProjectList = (username: string): Promise<AxiosResponse<YoutrackProjectInfoResponse[]>> => {
    const url = `${baseProjectUrl}/user/${username}`;
    return baseApi.get(url);
};

export const getYoutrackProject = (id: string): Promise<AxiosResponse<YoutrackProjectInfoResponse>> => {
    const url = `${baseProjectUrl}/${id}`;
    return baseApi.get(url);
};
