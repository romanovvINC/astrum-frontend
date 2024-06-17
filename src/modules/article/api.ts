import { AxiosResponse } from "axios";
import baseApi from "Api/BaseApi";
import { ArticleShortInfo } from "models/article/ArticleShortInfo";
import { ArticleInfoResponse } from "models/article/ArticleInfoResponse";
import { Category } from "models/article/Category";
import { FilterWithPaginationRequest } from "models/filter/FilterWithPaginationRequest";
import { getStringParamsFromFilter } from "Helpers/filterHelpers";
import { FilterVariantResponse } from "models/filter/FilterVariant";
import { ArticleTag } from "models/article/ArticleTag";

const baseUrl = "/articles";

export const getArticleList = ({
    filterParams,
    paginationParams,
}: FilterWithPaginationRequest): Promise<AxiosResponse<ArticleShortInfo[]>> => {
    const stringParams = getStringParamsFromFilter(filterParams);
    const url = `${baseUrl}?${stringParams}`;
    return baseApi.get(url, { params: { predicate: filterParams.predicate } });
};

export const getArticleById = (id: string): Promise<AxiosResponse<ArticleInfoResponse>> => {
    const url = `${baseUrl}/${id}`;
    return baseApi.get(url);
};

export const getArticleBySlug = (slug: string): Promise<AxiosResponse<ArticleInfoResponse>> => {
    const url = `${baseUrl}/${slug}`;
    return baseApi.get(url);
};

export const getArticleListFilter = (): Promise<AxiosResponse<FilterVariantResponse>> => {
    const url = `${baseUrl}/filters`;
    return baseApi.get(url);
};

export const getCategories = (): Promise<AxiosResponse<Category[]>> => {
    const url = `${baseUrl}/categories`;
    return baseApi.get(url);
};

export const createArticleTag = (data: FormData): Promise<AxiosResponse<ArticleTag>> => {
    const url = `${baseUrl}/tag`;
    return baseApi.post(url, data);
};

export const createArticle = (data: FormData): Promise<AxiosResponse<ArticleInfoResponse>> => {
    const url = baseUrl;
    return baseApi.post(url, data);
};

export const editArticle = (data: FormData, articleId: string): Promise<AxiosResponse<ArticleInfoResponse>> => {
    const url = `${baseUrl}/${articleId}`;
    return baseApi.put(url, data);
};

export const deleteArticle = (id: string): Promise<AxiosResponse<void>> => {
    const url = `${baseUrl}/${id}`;
    return baseApi.delete(url);
};

export const checkArticleName = (username: string, articleName: string) => {
    const url = `${baseUrl}/check/${username}/${articleName}`;
    return baseApi.get(url);
};
