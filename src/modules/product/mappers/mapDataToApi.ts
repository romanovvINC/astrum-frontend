import { ProductCreateInfo, ProductCreateInfoRequestPayload } from "models/product/ProductCreateInfo";
import { ProjectCreateInfo, ProjectCreateInfoRequestPayload } from "models/product/ProjectCreateInfo";
import { ProjectEditInfo, ProjectEditInfoRequestPayload } from "models/product/ProjectEditInfo";
import {
    ProductEditInfo,
    ProductEditInfoRequestPayload,
    ProductEditInfoWithFullProjectInfo,
} from "models/product/ProductEditInfo";
import { isProjectCreateInfo } from "modules/product/helpers/typeHelpers";

export const mapProjectCreateInfoToApi = (projectInfo: ProjectCreateInfo): ProjectCreateInfoRequestPayload => {
    const { startDate, endDate, customFields, members, ...rest } = projectInfo;
    const resultCustomFields = customFields.map(f => ({ name: f.name, value: f.value }));
    const resultMembers = members.map(m => ({ userId: m.userId, isManager: m.isManager, role: m.role }));
    return {
        ...rest,
        startDate: startDate.toJSON(),
        endDate: endDate ? endDate.toJSON() : undefined,
        customFields: resultCustomFields,
        members: resultMembers,
    };
};

export const mapProjectEditInfoToApi = (projectInfo: ProjectEditInfo): ProjectEditInfoRequestPayload => {
    const { id } = projectInfo;
    const projectWithoutId = mapProjectCreateInfoToApi(projectInfo);
    return {
        id,
        ...projectWithoutId,
    };
};

export const mapProductCreateInfoToApi = (productCreateInfo: ProductCreateInfo): ProductCreateInfoRequestPayload => {
    const { customer, startDate, endDate, projects, ...rest } = productCreateInfo;
    const resultProjects = projects.map(p => mapProjectCreateInfoToApi(p));
    return {
        ...rest,
        customerId: customer.id,
        startDate: startDate.toJSON(),
        endDate: endDate ? endDate.toJSON() : undefined,
        projects: resultProjects,
    };
};

export const mapProductEditInfoToApi = (
    productEditInfo: ProductEditInfoWithFullProjectInfo
): ProductEditInfoRequestPayload => {
    const { customer, startDate, endDate, projects, coverImage, ...rest } = productEditInfo;
    const resultProjects = projects.map(p => mapProjectCreateInfoToApi(p));
    return {
        ...rest,
        customerId: customer.id,
        startDate: startDate.toJSON(),
        endDate: endDate ? endDate.toJSON() : undefined,
        coverImage: typeof coverImage === "string" ? undefined : coverImage,
        projects: resultProjects,
    };
};
