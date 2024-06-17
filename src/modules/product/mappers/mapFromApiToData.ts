import { ProductInfo, ProductInfoResponse } from "models/product/ProductInfo";
import { ProjectShortInfo, ProjectShortInfoResponse } from "models/product/ProjectShortInfo";
import { ProjectInfo, ProjectInfoResponse } from "models/product/ProjectInfo";

export const mapProjectShortInfoResponseToData = (
    projectShortInfoResponse: ProjectShortInfoResponse
): ProjectShortInfo => {
    const { startDate, ...rest } = projectShortInfoResponse;
    return {
        ...rest,
        startDate: new Date(startDate),
    };
};

export const mapProjectShortInfoResponseListToData = (projectShortInfoResponseList: ProjectShortInfoResponse[]) => {
    return projectShortInfoResponseList.map(p => mapProjectShortInfoResponseToData(p));
};

export const mapProductInfoResponseToData = (productInfoResponse: ProductInfoResponse): ProductInfo => {
    const { startDate, endDate, projects, ...rest } = productInfoResponse;
    const resultProjects = mapProjectShortInfoResponseListToData(projects);
    return {
        ...rest,
        startDate: new Date(startDate),
        endDate: endDate ? new Date(endDate) : null,
        projects: resultProjects,
    };
};

export const mapProductInfoResponseListToData = (productInfoResponseList: ProductInfoResponse[]): ProductInfo[] => {
    return productInfoResponseList.map(p => mapProductInfoResponseToData(p));
};

export const mapProjectInfoResponseToData = (projectInfoResponse: ProjectInfoResponse): ProjectInfo => {
    const { startDate, endDate, ...rest } = projectInfoResponse;
    return {
        ...rest,
        startDate: new Date(startDate),
        endDate: endDate ? new Date(endDate) : null,
    };
};
