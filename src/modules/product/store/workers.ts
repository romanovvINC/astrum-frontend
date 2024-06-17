import { AxiosResponse } from "axios";
import { call, put, select } from "redux-saga/effects";
import { GetProductListRequest } from "./actionTypes/GetProductListTypes";
import { GetProductRequest } from "./actionTypes/GetProductTypes";
import { CreateProductRequest } from "./actionTypes/CreateProductTypes";
import { DeleteProductRequest } from "./actionTypes/DeleteProductTypes";
import { EditProductRequest } from "./actionTypes/EditProductTypes";
import { GetProjectRequest } from "./actionTypes/GetPtojectTypes";
import { EditProjectRequest } from "./actionTypes/EditProjectTypes";
import { DeleteProjectRequest } from "./actionTypes/DeleteProjectTypes";
import { ProductInfo, ProductInfoResponse } from "models/product/ProductInfo";
import { ProductListResponse } from "models/product/ProductListResponse";
import { ProductListInfo } from "models/product/ProductListInfo";
import { ProductState } from "models/product/ProductState";
import { MainFilterState } from "models/filter/FilterState";
import { FilterWithPaginationRequest } from "models/filter/FilterWithPaginationRequest";
import { Customer } from "models/product/Customer";
import {
    getProductList,
    getProductCustomerList,
    getProduct,
    createProduct,
    editProduct,
    deleteProduct,
    getProject,
    editProject,
    deleteProject,
    getProfileShortInfoList,
    getProfilePositions,
} from "../api";
import {
    getProductListSuccess,
    getProductListFailure,
    getProductCustomerListSuccess,
    getProductCustomerListFailure,
    getProductSuccess,
    getProductFailure,
    createProductSuccess,
    createProductFailure,
    editProductSuccess,
    editProductFailure,
    deleteProductSuccess,
    deleteProductFailure,
    setCanAsyncPending,
    setPageIndex,
    getProfileShortInfoListSuccess,
    getProfileShortInfoListFailure,
    getProjectSuccess,
    getProjectFailure,
    editProjectSuccess,
    editProjectFailure,
    deleteProjectFailure,
    deleteProjectSuccess,
    getProfilePositionListSuccess,
    getProfilePositionListFailure,
} from "../store";
import {
    mapProductInfoResponseListToData,
    mapProductInfoResponseToData,
    mapProjectInfoResponseToData,
} from "../mappers/mapFromApiToData";
import { notification } from "Utils/Notification";
import { productSelectors } from "..";
import { ShortProfileInfo } from "models/profile/ShortProfileInfo";
import {
    mapProductCreateInfoToApi,
    mapProductEditInfoToApi,
    mapProjectEditInfoToApi,
} from "modules/product/mappers/mapDataToApi";
import { ProductCreateInfoRequestPayload } from "models/product/ProductCreateInfo";
import { buildFormData } from "Redux/Helpers/BuildFormData";
import { ProjectInfo, ProjectInfoResponse } from "models/product/ProjectInfo";
import { ProjectEditInfo, ProjectEditInfoRequestPayload } from "models/product/ProjectEditInfo";
import { isProjectShortInfo } from "modules/product/helpers/typeHelpers";
import { ProjectShortInfo } from "models/product/ProjectShortInfo";
import { ProfilePositionInfo } from "models/profile/ProfilePositionInfo";

function* createSearchParams(filterState: MainFilterState, enableStartIndex = false) {
    const { count, pageIndex }: ProductState = yield select(productSelectors.getProductState);
    const result: FilterWithPaginationRequest = {
        filterParams: { ...filterState },
        paginationParams: { count, startIndex: enableStartIndex ? 0 : pageIndex },
    };
    if (result.filterParams.predicate === "") {
        result.filterParams.predicate = undefined;
    }
    return result;
}

function* transformAllProjectsToProjectEditInfo(projects: (ProjectEditInfo | ProjectShortInfo)[]) {
    const result: (ProjectEditInfo | ProjectShortInfo)[] = [];
    for (const p of projects) {
        if (isProjectShortInfo(p)) {
            const res: AxiosResponse<ProjectInfoResponse> = yield call(getProject, p.id);
            const project: ProjectInfo = yield call(mapProjectInfoResponseToData, res.data);
            result.push(project);
        } else {
            result.push(p);
        }
    }
    return result;
}

export function* getProductListWorker({ payload }: GetProductListRequest) {
    const resultParams: FilterWithPaginationRequest = yield call(createSearchParams, payload, true);
    yield put(setPageIndex(0));
    yield put(setCanAsyncPending(true));
    const res: AxiosResponse<ProductListResponse> = yield call(getProductList, resultParams);
    if (res) {
        if (res.data.nextExist) {
            yield put(setPageIndex(res.data.index));
        } else {
            yield put(setCanAsyncPending(false));
        }
        const result: ProductInfo[] = yield call(mapProductInfoResponseListToData, res.data.products);
        yield put(getProductListSuccess(result));
    } else {
        yield put(getProductListFailure("Нет данных"));
    }
}

export function* getProductListAsyncWorker({ payload }: GetProductListRequest) {
    const resultParams: FilterWithPaginationRequest = yield call(createSearchParams, payload);
    const res: AxiosResponse<ProductListResponse> = yield call(getProductList, resultParams);
    if (res) {
        if (res.data.nextExist) {
            yield put(setPageIndex(res.data.index));
        } else {
            yield put(setCanAsyncPending(false));
        }
        const { products }: ProductListInfo = yield select(productSelectors.getProductListInfo);
        const result: ProductInfo[] = yield call(mapProductInfoResponseListToData, res.data.products);
        yield put(getProductListSuccess([...products, ...result]));
    } else {
        yield put(getProductListFailure("Нет данных"));
    }
}

export function* getProductCustomerListWorker() {
    const res: AxiosResponse<Customer[]> = yield call(getProductCustomerList);
    if (res) {
        yield put(getProductCustomerListSuccess(res.data));
    } else {
        yield put(getProductCustomerListFailure("Нет данных"));
        yield call(notification, null, "Заказчики не подгрузились");
    }
}

export function* getProductWorker({ payload }: GetProductRequest) {
    const res: AxiosResponse<ProductInfoResponse> = yield call(getProduct, payload);
    if (res) {
        const result: ProductInfo = yield call(mapProductInfoResponseToData, res.data);
        yield put(getProductSuccess(result));
    } else {
        yield put(getProductFailure("Нет данных"));
    }
}

export function* createProductWorker({ payload }: CreateProductRequest) {
    const dataToRequest: ProductCreateInfoRequestPayload = yield call(mapProductCreateInfoToApi, payload.data);
    const data = new FormData();
    yield call(buildFormData, data, dataToRequest);
    const res: AxiosResponse<ProductInfoResponse> = yield call(createProduct, data);
    if (res) {
        const resultProduct: ProductInfo = yield call(mapProductInfoResponseToData, res.data);
        const { products }: ProductListInfo = yield select(productSelectors.getProductListInfo);
        const result: ProductInfo[] = [resultProduct, ...products];
        yield put(createProductSuccess());
        yield put(getProductListSuccess(result));
        if (payload.successCallback) {
            yield call(payload.successCallback);
        }
        yield call(notification, "Успех", "Продукт успешно создан", "success");
    } else {
        yield put(createProductFailure("Ошибка"));
        yield call(notification, null, "Не удалось создать продукт");
    }
}

export function* editProductWorker({ payload }: EditProductRequest) {
    const { id, projects } = payload.data;
    const resultProjects: ProjectEditInfo[] = yield call(transformAllProjectsToProjectEditInfo, projects);
    const copy = { ...payload.data, projects: resultProjects };
    const requestPayload: ProjectEditInfoRequestPayload = yield call(mapProductEditInfoToApi, copy);
    const data = new FormData();
    yield call(buildFormData, data, requestPayload);
    const res: AxiosResponse<ProductInfoResponse> = yield call(editProduct, { id, data });
    if (res) {
        const result: ProductInfo = yield call(mapProductInfoResponseToData, res.data);
        yield put(editProductSuccess(result));
        const { products }: ProductListInfo = yield select(productSelectors.getProductListInfo);
        const index = products.findIndex(p => p.id === payload.data.id);
        if (index !== -1) {
            const productCopy = [...products];
            productCopy[index] = result;
            yield put(getProductListSuccess(productCopy));
        }
        if (payload.successCallback) {
            yield call(payload.successCallback);
        }
        yield call(notification, "Успех", "Продукт успешно изменён", "success");
    } else {
        yield put(editProductFailure("Ошибка"));
        yield call(notification, null, "Не удалось изменить продукт");
    }
}

export function* deleteProductWorker({ payload }: DeleteProductRequest) {
    const res: AxiosResponse<void> = yield call(deleteProduct, payload.id);
    if (res) {
        const { products }: ProductListInfo = yield select(productSelectors.getProductListInfo);
        const result: ProductInfo[] = products.filter(p => p.id !== payload.id);
        yield put(getProductListSuccess(result));
        yield put(deleteProductSuccess());
        if (payload.successCallback) {
            yield call(payload.successCallback);
        }
        yield call(notification, "Успех", "Продукт успешно удалён", "success");
    } else {
        yield put(deleteProductFailure("Ошибка"));
    }
}

export function* getProjectWorker({ payload }: GetProjectRequest) {
    const res: AxiosResponse<ProjectInfoResponse> = yield call(getProject, payload);
    if (res) {
        const data: ProjectInfo = yield call(mapProjectInfoResponseToData, res.data);
        yield put(getProjectSuccess(data));
    } else {
        yield put(getProjectFailure("Нет данных"));
    }
}

export function* getProfilePositionsWorker() {
    const res: AxiosResponse<ProfilePositionInfo[]> = yield call(getProfilePositions);
    if (res) {
        yield put(getProfilePositionListSuccess(res.data));
    } else {
        yield put(getProfilePositionListFailure("Ошибка"));
    }
}

//TODO>>>>> ПОТОМ УБРАТЬ И ПЕРЕДЕЛАТЬ
export function* getProfileShortInfoListWorker() {
    const res: AxiosResponse<ShortProfileInfo[]> = yield call(getProfileShortInfoList);
    if (res) {
        yield put(getProfileShortInfoListSuccess(res.data));
    } else {
        yield put(getProfileShortInfoListFailure("Нет данных"));
        yield call(notification, null, "Не удалось загрузить список сотрудников");
    }
}
//TODO>>>>> ПОТОМ УБРАТЬ И ПЕРЕДЕЛАТЬ

export function* editProjectWorker({ payload }: EditProjectRequest) {
    const dataToRequest: ProjectEditInfoRequestPayload = yield call(mapProjectEditInfoToApi, payload.data);
    const res: AxiosResponse<ProjectInfoResponse> = yield call(editProject, {
        id: payload.data.id,
        data: dataToRequest,
    });
    if (res) {
        const result: ProjectInfo = yield call(mapProjectInfoResponseToData, res.data);
        const { products }: ProductListInfo = yield select(productSelectors.getProductListInfo);
        const resultProducts = [...products];
        const productIndex = resultProducts.findIndex(pr => pr.projects.some(p => p.id === result.id));
        if (productIndex !== -1) {
            const projectIndex = resultProducts[productIndex].projects.findIndex(p => p.id === result.id);
            if (projectIndex !== -1) {
                resultProducts[productIndex].projects[projectIndex] = {
                    id: result.id,
                    name: result.name,
                    startDate: result.startDate,
                };
            }
        }
        yield put(getProductListSuccess(resultProducts));
        yield put(editProjectSuccess(result));
        if (payload.successCallback) {
            yield call(payload.successCallback);
        }
        yield call(notification, "Успех", "Проект успешно изменён", "success");
    } else {
        yield put(editProjectFailure("Ошибка"));
    }
}

export function* deleteProjectWorker({ payload }: DeleteProjectRequest) {
    const res: AxiosResponse<void> = yield call(deleteProject, payload.id);
    if (res) {
        const { products }: ProductListInfo = yield select(productSelectors.getProductListInfo);
        const result = [...products];
        const productIndex: number = yield call(result.findIndex, pr => pr.projects.some(p => p.id === payload.id));
        const projectIndex: number = yield call(result[productIndex].projects.findIndex, p => p.id === payload.id);
        yield call(result[productIndex].projects.splice, projectIndex, 1);
        yield put(getProductListSuccess(result));
        yield put(deleteProjectSuccess());
        if (payload.successCallback) {
            yield call(payload.successCallback);
        }
        yield call(notification, "Успех", "Проект успешно удалён", "success");
    } else {
        yield put(deleteProjectFailure("Ошибка"));
    }
}
