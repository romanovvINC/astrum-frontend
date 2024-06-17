import { call, put, select } from "redux-saga/effects";
import { buildFormData } from "Redux/Helpers/BuildFormData";
import { validate, version } from "uuid";
import { AxiosResponse } from "axios";
import {
    checkArticleName,
    createArticle,
    createArticleTag,
    deleteArticle,
    editArticle,
    getArticleById,
    getArticleBySlug,
    getArticleList,
    getArticleListFilter,
    getCategories,
} from "../api";
import {
    createArticleFailure,
    createArticleSuccess,
    deleteArticleFailure,
    deleteArticleSuccess,
    editArticleSuccess,
    getCategoriesFailure,
    getCategoriesSuccess,
    getArticleListFilterFailure,
    getArticleListFilterSuccess,
    getArticleFailure,
    getArticleSuccess,
    getArticleListFailure,
    getArticleListSuccess,
    checkArticleNameSuccess,
    checkArticleNameFailure,
} from "../store";
import { notification } from "Utils/Notification";
import { FilterVariantResponse } from "models/filter/FilterVariant";
import { GetArticleListRequest } from "./actionTypes/GetArticleListTypes";
import { ArticleShortInfoResponse } from "models/article/ArticleShortInfoResponse";
import { ArticleInfoResponse } from "models/article/ArticleInfoResponse";
import { CreateArticleRequest } from "./actionTypes/CreateArticleTypes";
import { Category } from "models/article/Category";
import { DeleteArticleRequest } from "./actionTypes/DeleteArticleTypes";
import { mapArticleCreateToApi, mapArticleEditToApi } from "modules/article/mappers/mapDataToApi";
import { EditArticleRequest } from "./actionTypes/EditArticleTypes";
import { mapArticleInfoResponseToData, mapArticleListToData } from "modules/article/mappers/mapFromApiToData";
import { mapFilterToApi } from "Helpers/filterHelpers";
import { GetArticleRequest } from "./actionTypes/GetArticleTypes";
import { articleSelectors } from "./selectors";
import { ArticleListInfo } from "models/article/ArticleListInfo";
import { ArticleInfo } from "models/article/ArticleInfo";
import { CheckArticleNameRequest } from "modules/article/store/actionTypes/CheckArticleNameTypes";
import { authSelectors } from "modules/auth";
import { BasicInfo } from "models/auth/BasicInfo";
import { CheckArticleNameResponse } from "models/article/CheckArticleNamePayload";
import { ArticleTag } from "models/article/ArticleTag";

export function* getCategoriesWorker() {
    const response: AxiosResponse<Category[]> = yield call(getCategories);
    if (response) {
        yield put(getCategoriesSuccess(response.data));
    } else {
        yield put(getCategoriesFailure("error"));
        yield call(notification, null, "Не получилось подгрузить категории");
    }
}

export function* getArticleListFilterWorker() {
    const response: AxiosResponse<FilterVariantResponse> = yield call(getArticleListFilter);
    if (response) {
        yield put(getArticleListFilterSuccess(response.data.blocks));
    } else {
        yield put(getArticleListFilterFailure("error"));
    }
}

export function* getArticleListWorker({ payload }: GetArticleListRequest) {
    const filterParams = mapFilterToApi(payload);
    const response: AxiosResponse<ArticleShortInfoResponse[]> = yield call(getArticleList, {
        filterParams,
        //TODO >>>>> исправить
        paginationParams: {
            count: 10,
            startIndex: 0,
        },
    });

    if (response) {
        const data = mapArticleListToData(response.data);
        yield put(getArticleListSuccess(data));
    } else {
        yield put(getArticleListFailure("error"));
    }
}

export function* getArticleBySlugWorker({ payload }: GetArticleRequest) {
    const response: AxiosResponse<ArticleInfoResponse> = yield call(getArticleBySlug, payload);
    if (response) {
        const article = mapArticleInfoResponseToData(response.data);
        yield put(getArticleSuccess(article));
    } else {
        yield put(getArticleFailure("error"));
    }
}

export function* getArticleByIdWorker({ payload }: GetArticleRequest) {
    const response: AxiosResponse<ArticleInfoResponse> = yield call(getArticleById, payload);
    if (response) {
        const article = mapArticleInfoResponseToData(response.data);
        yield put(getArticleSuccess(article));
    } else {
        yield put(getArticleFailure("error"));
    }
}

function* createArticleTagsWorker(tags: ArticleTag[], categoryId: string) {
    const result: ArticleTag[] = [];
    for (const tag of tags) {
        if (version(tag.id) === 1) {
            const data = new FormData();
            data.append("name", tag.name);
            data.append("categoryId", categoryId);
            const res: AxiosResponse<ArticleTag> = yield call(createArticleTag, data);
            if (res) {
                result.push(res.data);
            }
        } else {
            result.push(tag);
        }
    }
    return result;
}

export function* createArticleWorker({ payload }: CreateArticleRequest) {
    const newTags: ArticleTag[] = yield call(createArticleTagsWorker, payload.data.tags, payload.data.category.id);
    const data = mapArticleCreateToApi({ ...payload.data, tags: newTags });
    const formData = new FormData();
    buildFormData(formData, data);
    const response: AxiosResponse<ArticleInfoResponse> = yield call(createArticle, formData);
    if (response) {
        yield put(createArticleSuccess());
        const { articles }: ArticleListInfo = yield select(articleSelectors.getArticleListInfo);
        const result: ArticleInfo = yield call(mapArticleInfoResponseToData, response.data);
        yield put(getArticleListSuccess([result, ...articles]));
        if (payload.successCallback) {
            yield call(payload.successCallback);
        }
        yield call(notification, "Успех", "Статья успешно создана", "success");
    } else {
        yield put(createArticleFailure("error"));
        yield call(notification, null, "Не удалось создать статью");
    }
}

export function* editArticleWorker({ payload }: EditArticleRequest) {
    const newTags: ArticleTag[] = yield call(createArticleTagsWorker, payload.data.tags, payload.data.category.id);
    const data = mapArticleEditToApi({ ...payload.data, tags: newTags });
    const formData = new FormData();
    buildFormData(formData, data);
    const response: AxiosResponse<ArticleInfoResponse> = yield call(editArticle, formData, data.id);
    if (response) {
        const article = mapArticleInfoResponseToData(response.data);
        yield put(getArticleSuccess(article));
        yield put(editArticleSuccess());
        const { articles }: ArticleListInfo = yield select(articleSelectors.getArticleListInfo);
        const result: ArticleInfo = yield call(mapArticleInfoResponseToData, response.data);
        yield put(getArticleListSuccess([result, ...articles]));
        if (payload.successCallback) {
            yield call(payload.successCallback);
        }
        yield call(notification, "Успех", "Статья успешно изменена", "success");
    } else {
        yield put(createArticleFailure("error"));
        yield call(notification, null, "Не удалось изменить статью");
    }
}

export function* deleteArticleWorker({ payload }: DeleteArticleRequest) {
    const response: AxiosResponse<void> = yield call(deleteArticle, payload.id);
    if (response) {
        const { articles }: ArticleListInfo = yield select(articleSelectors.getArticleListInfo);
        yield put(deleteArticleSuccess());
        const result = articles.filter(a => a.id !== payload.id);
        yield put(getArticleListSuccess(result));
        if (payload.successCallback) {
            yield call(payload.successCallback);
        }
        yield call(notification, "Успех", "Статья была успешно удалена", "success");
    } else {
        yield put(deleteArticleFailure("error"));
        yield call(notification, null, "Не получилось удалить статью");
    }
}

export function* checkArticleNameWorker({ payload }: CheckArticleNameRequest) {
    const { username }: BasicInfo = yield select(authSelectors.getBasicInfo);
    const res: AxiosResponse<CheckArticleNameResponse> = yield call(checkArticleName, username, payload);
    if (res) {
        yield put(checkArticleNameSuccess(!res.data.isFree));
    } else {
        yield put(checkArticleNameFailure("Ошибка"));
    }
}
