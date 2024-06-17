import { AxiosResponse } from "axios";
import baseApi from "Api/BaseApi";
import { ProductInfoResponse } from "models/product/ProductInfo";
import { Customer } from "models/product/Customer";
import { ProjectInfo } from "models/product/ProjectInfo";
import { ProjectEditInfoRequestPayload } from "models/product/ProjectEditInfo";
import { ProductListResponse } from "models/product/ProductListResponse";
import { FilterWithPaginationRequest } from "models/filter/FilterWithPaginationRequest";
import { ShortProfileInfo } from "models/profile/ShortProfileInfo";
import { ProfilePositionInfo } from "models/profile/ProfilePositionInfo";

const baseProductUrl = "/product";
const baseProjectUrl = "/projects";

export const getProductList = ({
    filterParams,
    paginationParams,
}: FilterWithPaginationRequest): Promise<AxiosResponse<ProductListResponse>> => {
    const url = baseProductUrl;
    return baseApi.get(url, {
        params: { predicate: filterParams.predicate, ...paginationParams },
    });
};

export const getProductCustomerList = (): Promise<AxiosResponse<Customer[]>> => {
    const url = `${baseProjectUrl}/customers`;
    return baseApi.get(url);
};

export const getProduct = (id: string): Promise<AxiosResponse<ProductInfoResponse>> => {
    const url = `${baseProductUrl}/${id}`;
    return baseApi.get(url);
};

export const createProduct = (data: FormData): Promise<AxiosResponse<ProductInfoResponse>> => {
    const url = baseProductUrl;
    return baseApi.post(url, data);
};

export const editProduct = ({
    id,
    data,
}: {
    id: string;
    data: FormData;
}): Promise<AxiosResponse<ProductInfoResponse>> => {
    const url = `${baseProductUrl}/${id}`;
    return baseApi.put(url, data);
};

export const deleteProduct = (id: string): Promise<AxiosResponse<void>> => {
    const url = `${baseProductUrl}/${id}`;
    return baseApi.delete(url);
};

export const getProject = (id: string): Promise<AxiosResponse<ProjectInfo>> => {
    const url = `${baseProjectUrl}/get/${id}`;
    return baseApi.get(url);
};

export const getProfilePositions = (): Promise<AxiosResponse<ProfilePositionInfo[]>> => {
    const url = "account/user-profile/positions/all";
    return baseApi.get(url);
};

//TODO>>>>> ПОТОМ УБРАТЬ И ПЕРЕДЕЛАТЬ
export const getProfileShortInfoList = (): Promise<AxiosResponse<ShortProfileInfo[]>> => {
    const url = "account/user-profile";
    return baseApi.get(url);
};
//TODO>>>>> ПОТОМ УБРАТЬ И ПЕРЕДЕЛАТЬ

export const editProject = ({
    id,
    data,
}: {
    id: string;
    data: ProjectEditInfoRequestPayload;
}): Promise<AxiosResponse<ProjectInfo>> => {
    const url = `${baseProjectUrl}/${id}`;
    return baseApi.put(url, data);
};

export const deleteProject = (id: string): Promise<AxiosResponse<void>> => {
    const url = `${baseProjectUrl}/${id}`;
    return baseApi.delete(url);
};
